import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';
import { GameCard } from '@/components/GameCard/GameCard';

import { Header } from '../modules/Header/Header';
import { Accordions } from '../components/Accordion/Accordion';

import { Input } from '@/components/Inputfields/Inputfield';

import { Footer } from '@/modules/Footer/Footer';

import { Hero } from '@/modules/Hero/Hero';
import { ParagraphBold } from '@/components/ParagraphBold/ParagraphBold';
import { CustomerQuoteSet } from '@/modules/CustomerQuoteSet/CustomerQuoteSet';

import { Layout } from '@/Layout';
import { link } from 'fs';

export default function Home() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Dk's bedste gaming center"
            redWord={['bedste']}
            content='Leder du efter de bedste rammer til at game? Vi har lige det du leder efter. Vi er et top moderne gaming center hvor kvalitet og service er i højsædet. Vi tilbyder et stort udvalg af snacks, sandwiches og drikke.Vi arrangerer både børnefødselsdage og firma events, med fokus på fællesskabet. Hos Next Level mener vi ikke at gaming behøver at være asocialt. Tværtimod er det noget vi samles om!'
            buttonProps={{ children: 'Book Nu' }}
            link='/booking'
            isFrontPage={true}
          />
          <section className='flex justify-center'>
            <article className='spacer w-full'>
              <h2>
                Next Level <span className='text-accentCol'>Priser</span>
              </h2>
              <div className='flex justify-center md:justify-around flex-wrap md:flex-row mt-14 md:mt-20 gap-10'>
                <Card
                  variant={'level1'}
                  header='Level 1'
                  timeAntal={5}
                  totalPris={70}
                  oprettelseInkl={false}
                />
                <Card
                  variant={'level2'}
                  header='Level 2'
                  timeAntal={10}
                  totalPris={120}
                  oprettelseInkl={false}
                />
                <Card
                  variant={'level3'}
                  header='Level 3'
                  timeAntal={15}
                  totalPris={150}
                  oprettelseInkl={true}
                />
              </div>

              <Button
                variant={'secondary'}
                children={'Se alle vores priser'}
                link='../priser'
              />
            </article>
          </section>
          <section className=' bg-hero2 bg-no-repeat bg-cover w-screen  mt-14 md:mt-16 lg:mt-20'>
            <article className='backdrop-brightness-50 h-full py-14 md:py-16 lg:py-20 flex justify-center '>
              <div className='spacer !mt-0 w-full'>
                <h2>
                  Skal du holde et <span className='text-accentCol'>Event?</span>
                </h2>
                <ParagraphBold
                  underlined
                  text='VI holder de bedste events med fokus på gaming'
                />

                <p>
                  Så er Next Level gaming stedet. Vi tilbyder en række forskellige events til grupper i alle størrelser. Skal du
                  give dine medarbejdere en på opleveren? Måske skal i holde en polterabend og leder efter noget hvor kun
                  fantasien sætter grænser? Det kan også være en tilfældig weekend med vennerne eller veninderne. Vi garanterer at
                  sjov konkurrence og fællesskab er inkluderet når i besøger Next Level Gaming.
                </p>

                <Button
                  //This is wating on aproval of another branch, therefore it's commented out
                  link='../events'
                  children='Find vores events her'
                />
              </div>
            </article>
          </section>

          <CustomerQuoteSet
            header='Vores kunder siger'
            redWord='kunder'
            customerQuotes={[
              {
                quote: {
                  header: 'Et Gaming Mecca for Alle',
                  text: 'Jeg har sjældent oplevet et gaming center så inkluderende som dette. Fra den lækre mad til de spændende arrangementer – det her sted har virkelig formået at skabe en unik atmosfære. Uanset om du er nybegynder eller hardcore gamer, er der plads til alle. Jeg er hooked!',
                  author: 'John Jensen',
                },
              },
              {
                quote: {
                  header: 'Gaming med Hjerte og Sjæl',
                  text: 'At finde et sted, der ikke kun handler om gaming, men også om fællesskab og sjov, har været fantastisk. Gaming centeret har formået at skabe en oase af underholdning, hvor jeg kan fordybe mig i spil, nyde god mad og drikke, og samtidig møde andre ligesindede gamere. Det er virkelig et sted med hjerte og sjæl!',
                  author: 'Jonas Petersen',
                },
              },
              {
                quote: {
                  header: 'Gaming og Fællesskab på Højeste Niveau',
                  text: 'At deltage i arrangementer på dette gaming center har været en fantastisk oplevelse. Fra turneringer til hyggeaftener har stedet formået at skabe et fællesskab, der går ud over skærmene. Den brede vifte af spil, den lækre forplejning og den imødekommende atmosfære gør dette til mit go-to sted for gaming og sociale aktiviteter. Thumbs up!',
                  author: 'Filip Jensen',
                },
              },
            ]}
          />
        </main>
      </Layout>
    </>
  );
}
