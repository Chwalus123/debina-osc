'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

const sections = [
  {
    title: 'Przedmiot regulaminu',
    items: [
      'Poniższy regulamin służy zapewnieniu spokojnego i bezpiecznego pobytu naszych Gości podczas wypoczynku.',
      'Określa on prawa i obowiązki Stron wynajmu apartamentów i stanowi jedyny dokument regulujący stosunki prawne pomiędzy Stronami: administratorem i Gośćmi, a nadto wyczerpująco reguluje prawa i obowiązki pomiędzy nimi.',
      'Dokonanie rezerwacji najmu apartamentów oraz uiszczenie opłaty oznacza zapoznanie się z poniższym Regulaminem.',
      'Wynajmujący oświadcza, że przeczytał, zrozumiał i zgadza się z zapisami niniejszego Regulaminu.',
      'Regulamin obowiązuje wszystkie osoby przebywające w apartamentach wynajmowanych.',
    ],
  },
  {
    title: 'Rezerwacja / Opłaty / Rezygnacja z pobytu',
    items: [
      'Doba noclegowa rozpoczyna się o godzinie 14:00 w dniu przyjazdu, kończy o godzinie 10:00 dnia następnego.',
      'Warunkiem rezerwacji jest uiszczenie zadatku w wysokości 25% całkowitej ceny wynajmu w terminie 3 dni od dokonania rezerwacji. Brak wpłaty w terminie powoduje anulowanie rezerwacji, o czym wynajmujący nie musi być poinformowany. Rezerwacja zostaje zawarta w momencie potwierdzenia wpłaty przez administratora.',
      'Warunkiem wydania kluczy jest płatność z góry za usługę najpóźniej w przeddzień przyjazdu.',
      'Przedłużenie rezerwacji jest możliwe po uprzednim zgłoszeniu tego faktu i uzyskaniu zgody administratora najpóźniej w przeddzień terminu, w którym upływa najem apartamentu. Administrator uwzględnia życzenia przedłużenia pobytu w miarę dostępności apartamentów.',
      'Administrator zastrzega minimalny termin najmu – 3 doby noclegowe.',
      'Stawki najmu apartamentów są podane w polskich złotych. Potwierdzenie wniesienia opłaty za wynajem stanowi faktura VAT z informacją o formie płatności i rachunkiem bankowym.',
      'Cennik wynajmu apartamentów oraz opłaty dodatkowe obowiązuje na rok kalendarzowy, a jego ogłoszenie następuje na naszej stronie www. Administrator zastrzega sobie prawo zmiany cen w kolejnych latach.',
      'Z chwilą rezerwacji apartamentów obligatoryjnie należy podać ilość Gości przewidzianych do czasowego pobytu. W apartamentach może przebywać taka liczba osób, jaka została zadeklarowana w momencie dokonywania rezerwacji.',
      'Podczas zameldowania pobierana jest gotówką odpowiednia opłata klimatyczna za osobę za dobę — wysokość opłaty klimatycznej zostaje wskazana w cenniku.',
      'Rezygnację z pobytu należy złożyć w formie pisemnej do 7 dni przed terminem przyjazdu (zostanie zwrócona wynajmującemu wpłacona kwota w poczet pobytu pomniejszona o kwotę zadatku). W indywidualnych przypadkach o zwrocie należności decyduje administrator apartamentów. Brak przyjazdu lub brak kontaktu ze strony wynajmującego w umówionym dniu przyjazdu skutkuje zwolnieniem apartamentu do ponownej rezerwacji.',
    ],
  },
  {
    title: 'Usługi',
    items: [
      'Wszyscy Goście mogą nieodpłatnie korzystać z sieci Wi-Fi.',
      'Na życzenie Gości bez dodatkowych opłat oferujemy możliwość korzystania z wyposażenia apartamentów: żelazko, deska do prasowania, suszarka do włosów, leżaki, parawan.',
      'W standardzie apartamentów oferujemy możliwość korzystania z urządzeń elektro AGD/RTV.',
      'Na terenie ogrodzonego obiektu ul. Modrzewiowa 29 wyznaczone miejsca parkingowe stanowią własność prywatną innych właścicieli obiektów i to oni decydują o ewentualnym nałożeniu opłaty parkingowej za nieprawne pozostawienie auta.',
      'Apartamenty ul. Modrzewiowa 29 44A / 44B nie posiadają przypisanych do siebie miejsc parkingowych. Pozostaje możliwość parkowania aut w miejscu niemonitorowanym poza obiektem, za które nie bierze odpowiedzialności administrator apartamentów.',
      'Administrator apartamentów nie odpowiada za niezawinione przez niego przerwy w dostawie mediów.',
    ],
  },
  {
    title: 'Szkody / Prawa / Obowiązki',
    items: [
      'Niezgłoszenie uwag i zastrzeżeń co do stanu technicznego w dniu zameldowania do apartamentu równoznaczne jest z tym, że apartament (jak i oddane do użytku sprzęty) został oddany do użytku w stanie niebudzącym uwag i zastrzeżeń gościa.',
      'Goście Apartamentów ul. Modrzewiowa 29 44A / 44B ponoszą pełną odpowiedzialność materialną za wszelkiego rodzaju uszkodzenia, zniszczenia lub kradzieże mienia, powstałe z ich winy lub winy odwiedzających ich osób.',
      'W przypadku wystąpienia jakiejkolwiek szkody, Gość ma obowiązek niezwłocznie powiadomić o tym fakcie administratora apartamentów.',
      'Goście ponoszą odpowiedzialność za wniesione w czasie pobytu i pozostawione po zakończeniu pobytu rzeczy. Przedmioty osobistego użytku pozostawione przez wyjeżdżającego Gościa będą na życzenie odesłane na wskazany adres, na jego koszt, o ile zgłoszenie nastąpi w dniu opuszczania apartamentów. W przypadku braku dyspozycji przedmioty zostaną trwale usunięte.',
      'Administrator odpowiada za szkody wynikłe z właściwości majątku wyposażenia apartamentów i/lub wskutek siły wyższej, niewynikające z działań najemcy.',
      'Wynajmujący zobowiązuje się utrzymać czystość w przestrzeni wynajmowanej oraz przestrzegać zasad porządku obowiązującego w budynku, na placu zabaw oraz w miejscach parkingowych.',
      'Nieczystości prosimy o wrzucanie wyłącznie do śmietnika i znajdujących się w nim odpowiednich pojemników (segregacja śmieci).',
      'Administrator apartamentów może odmówić przyjęcia Gościa, który podczas poprzedniego pobytu naruszył Regulamin pobytu, wyrządzając szkodę w mieniu lub w inny sposób zakłócił spokojny pobyt pozostałych Gości.',
      'Administrator nie odpowiada za prace remontowe i wykończeniowe w budynku i wokół niego oraz wszelkich immisji, w szczególności hałasu z nieruchomości sąsiednich, o których nie został poinformowany przed przyjazdem Klienta.',
    ],
  },
  {
    title: 'Sprzątanie / Naprawy / Prawo wejścia',
    items: [
      'W trosce o zachowanie prywatności Gości, nie zapewniamy sprzątania apartamentów w trakcie pobytu Gości.',
      'Wykonywanie niezbędnych napraw lub usuwanie usterek technicznych następuje po uprzednim porozumieniu z Gościem.',
      'W całej przestrzeni obiektu ul. Modrzewiowa 29 i w naszych apartamentach, Goście są zobligowani do utrzymania porządku po własnych pupilach.',
      'Gdy istnieje podejrzenie popełnienia przestępstwa, w przypadku nagłym (zagrożenie życia lub mienia) lub gdy istnieje uzasadnione podejrzenie, że apartament został przez wynajmującego wykorzystany w niedozwolony sposób — administrator zastrzega sobie prawo wejścia do niego bez zgody wynajmującego.',
      'W dniu wyjazdu administrator ma prawo do skontrolowania stanu technicznego apartamentu w obecności wynajmującego.',
    ],
  },
  {
    title: 'Kary umowne',
    items: [
      'Wykorzystywanie apartamentów do innych celów niż mieszkalne, np. organizowanie imprez, uroczystości lub przyjęć towarzyskich, jest niedozwolone. Naruszenie niniejszego zakazu skutkuje obciążeniem rachunku Gościa karą umowną w kwocie 600 PLN, a także możliwością wypowiedzenia noclegu ze skutkiem natychmiastowym.',
      'Obowiązuje zachowanie ciszy nocnej w godzinach 22:00–6:00. Zgłoszenie naruszenia ciszy nocnej przez interwencję innych Gości skutkuje obciążeniem rachunku Gościa karą umowną w kwocie 500 PLN.',
      'Apartamenty ul. Modrzewiowa 29 44A / 44B są przestrzenią dla osób niepalących. Zakaz nie dotyczy przestrzeni balkonów i tarasu widokowego. Naruszenie zakazu palenia w samych apartamentach skutkuje obciążeniem rachunku Gości karą umowną w kwocie 1 000 PLN.',
      'Zgubienie kluczy skutkuje obciążeniem rachunku Gościa karą umowną w kwocie 1 000 PLN, co stanowi koszt wymiany zamka i dorobienia nowych kluczy.',
      'Za zniszczenia wyrządzone przez zwierzę odpowiada wynajmujący.',
    ],
  },
  {
    title: 'Bezpieczeństwo użytkowania mienia',
    items: [
      'Wynajmujący odpowiada za bezpieczeństwo swoje i swoich Gości podczas przebywania w apartamentach, przestrzeni należących do apartamentów (balkony, taras widokowy) oraz w przestrzeni całego obiektu ul. Modrzewiowa 29.',
      'Administrator nie bierze odpowiedzialności za żadne ryzykowne zachowania osób przebywających w jego przestrzeni wynajmowanej.',
      'Zabrania się przechowywania w apartamentach wszelkich niebezpiecznych dla zdrowia substancji i materiałów niezgodnych z prawem.',
      'Dla bezpieczeństwa administrator monitoruje wyłącznie przestrzeń wspólną dla swoich apartamentów — tj. korytarz. Celem bezpieczeństwa, wykonania umowy wynajmu, wypełnienia obowiązków prawnych ciążących na administratorze lub dochodzenia ewentualnych roszczeń bądź obrony praw administratora (art. 6 ust. 1 lit. f RODO).',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      {/* NAGŁÓWEK */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#f0f9fd' }}>
        <div className="container mx-auto max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#3a8067' }}
          >
            Apartamenty nad morzem Dębina
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className="mt-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#0d2f45',
            }}
          >
            Regulamin wynajmu krótkoterminowego
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-sm"
            style={{ color: '#64748b' }}
          >
            ul. Modrzewiowa 29, 44A / 44B · 76-211 Dębina · tel.&nbsp;501&nbsp;601&nbsp;881
          </motion.p>
        </div>
      </section>

      {/* TREŚĆ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="p-8 md:p-12 rounded-3xl space-y-10"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 16px rgba(10,31,46,0.06)',
            }}
          >
            {sections.map(({ title, items }, si) => (
              <div key={title}>
                <h2
                  className="text-sm font-bold uppercase tracking-wide mb-4 pb-2 border-b"
                  style={{ color: '#124f74', borderColor: '#ddf0f9', letterSpacing: '0.04em' }}
                >
                  {si + 1}. {title}
                </h2>
                <ol className="space-y-3 list-decimal list-outside pl-5">
                  {items.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            {/* Link do karty meldunku */}
            <div
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{ backgroundColor: '#f0f9fd', border: '1px solid #b3ddf0' }}
            >
              <FileText size={20} style={{ color: '#2280b8', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#0d2f45' }}>
                  Formularz meldunkowy
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#64748b' }}>
                  Przy zameldowaniu każdy Gość zobowiązany jest do okazania dokumentu tożsamości
                  i podpisania Karty Meldunku Pobytu. Możesz zapoznać się z formularzem wcześniej.
                </p>
                <Link
                  href="/meldunek"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2"
                  style={{ color: '#2280b8' }}
                >
                  Zobacz formularz meldunkowy →
                </Link>
              </div>
            </div>

            <p className="text-xs pt-4 border-t" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
              W razie pytań dotyczących Regulaminu prosimy o kontakt:{' '}
              <a
                href="tel:+48501601881"
                className="underline hover:text-slate-600"
              >
                501 601 881
              </a>
              {' · '}
              <a
                href="mailto:odpocznijspokojnie@gmail.com"
                className="underline hover:text-slate-600"
              >
                odpocznijspokojnie@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
