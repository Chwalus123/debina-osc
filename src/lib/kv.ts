/**
 * Warstwa dostępu do KV (baza rezerwacji / opinii / cache iCal).
 *
 * ▸ Produkcja (Vercel): jeśli dostępne są dane połączenia do Upstash Redis
 *   (zmienne UPSTASH_REDIS_REST_* lub zgodne aliasy KV_REST_API_*), używamy
 *   klienta @upstash/redis. To jest ścieżka rekomendowana przez Vercel po
 *   migracji „Vercel KV" → Upstash Redis (Marketplace).
 *
 * ▸ Lokalny development: gdy tych zmiennych brak, korzystamy z lokalnego
 *   magazynu plikowego (.data/kv-dev.json), dzięki czemu formularz rezerwacji,
 *   panel admina i lista oczekujących działają bez bazy w chmurze.
 *
 * Używamy tylko podzbioru API wykorzystywanego w projekcie: get / set / del.
 * @upstash/redis (jak i wcześniejszy @vercel/kv) automatycznie
 * serializuje/deserializuje JSON, a kod czytający jest odporny na zwrot
 * zarówno stringa, jak i obiektu (`typeof raw === 'string' ? JSON.parse : raw`).
 */
import { Redis } from '@upstash/redis'
import fs from 'node:fs'
import path from 'node:path'

export interface KvLike {
  get<T = unknown>(key: string): Promise<T | null>
  set(key: string, value: unknown): Promise<unknown>
  del(key: string): Promise<unknown>
}

/* Odczyt danych połączenia — najpierw natywne zmienne Upstash, potem aliasy KV. */
function getRemoteConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
  if (url && token) return { url, token }
  return null
}

/* ─── Klient zdalny (Upstash Redis) ─────────────────────────────────────── */

function createRemoteKv(config: { url: string; token: string }): KvLike {
  const redis = new Redis({ url: config.url, token: config.token })
  return {
    get: <T = unknown>(key: string) => redis.get<T>(key),
    set: (key: string, value: unknown) => redis.set(key, value as string),
    del: (key: string) => redis.del(key),
  }
}

/* ─── Lokalny magazyn plikowy (tylko development) ───────────────────────── */

function createLocalKv(): KvLike {
  const dir = path.join(process.cwd(), '.data')
  const file = path.join(dir, 'kv-dev.json')

  let store: Record<string, unknown> = {}
  try {
    if (fs.existsSync(file)) {
      store = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>
    }
  } catch {
    store = {}
  }

  let warned = false
  const warnOnce = () => {
    if (warned) return
    warned = true
    console.warn(
      '[kv] Brak połączenia do Upstash Redis (UPSTASH_REDIS_REST_* / KV_REST_API_*). ' +
        'Używam lokalnego magazynu .data/kv-dev.json — WYŁĄCZNIE do developmentu.',
    )
  }

  const persist = () => {
    try {
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(file, JSON.stringify(store, null, 2), 'utf8')
    } catch (e) {
      console.error('[kv] Nie udało się zapisać lokalnego magazynu:', e)
    }
  }

  return {
    async get<T = unknown>(key: string): Promise<T | null> {
      warnOnce()
      return key in store ? (store[key] as T) : null
    },
    async set(key: string, value: unknown): Promise<unknown> {
      warnOnce()
      store[key] = value
      persist()
      return 'OK'
    },
    async del(key: string): Promise<unknown> {
      warnOnce()
      const existed = key in store
      delete store[key]
      persist()
      return existed ? 1 : 0
    },
  }
}

/* Pojedyncza instancja w obrębie procesu (przetrwa HMR w dev). */
const globalForKv = globalThis as unknown as { __kv?: KvLike }

function resolveKv(): KvLike {
  const config = getRemoteConfig()
  return config ? createRemoteKv(config) : createLocalKv()
}

export const kv: KvLike = (globalForKv.__kv ??= resolveKv())
