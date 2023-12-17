import { Layout } from '@/Layout';
import { Hero } from '@/modules/Hero/Hero';
import Image from 'next/image';
import barnVr from '../../../public/images/event/foedselsdag/barn-vr.jpeg';
import { Card } from '@/components/Cards/Card';
import { Button } from '@/components/Button/Button';
import foedselsdagImg1 from '../../../public/images/event/foedselsdag/barn-vr.jpeg';
import foedselsdagImg2 from '../../../public/images/event/foedselsdag.jpg';
import { RelatedContact } from '../../components/RelatedContact/RelatedContact';
import Head from 'next/head';

export default function Foedselsdag() {
  return (
    <>
      <Head>
        <title>Unikke Fødselsdagsfester hos Next Level Gaming: En Gaming Oplevelse for Børn</title>
        <meta
          name='description'
          content='Fejr din fødselsdag med en uforglemmelig gaming oplevelse hos Next Level Gaming. Vores specialdesignede fødselsdagspakker inkluderer spændende spil, lækker mad og en fantastisk atmosfære, perfekt for børn og unge. Skræddersy din fest med vores forskellige spil og aktiviteter for en mindeværdig fødselsdag.'
        />
      </Head>
      <Layout>
        <main>
          <Hero
            header='Fødseldagen du aldrig glemmer'
            redWord={['du', 'aldrig', 'glemmer']}
            content='En fødselsdag er noget særligt. Derfor fortjener den også at blive fejret med manér. Hos Next Level gaming har vi skabt den ultimative fødselsdagsoplevelse, hvor der er fokus på fællesskab, sjov konkurrence og en fødselsdag du sent glemmer.'
            buttonProps={{
              children: 'Kontakt os',
              link: '../om-os/kontakt?foedselsdag',
            }}
            isFrontPage={false}
          />

          <section>
            <div className='flex justify-center'>
              <h2 className='spacer w-full'>
                next level <span className=' text-accentCol'>fødselsdag</span>
              </h2>
            </div>

            <article className='flex justify-center'>
              <div className='spacer w-full flex flex-col md:flex-row gap-14'>
                <div>
                  <h3
                    className='mt-0
            '
                  >
                    Elsker du og dine venner at game?
                  </h3>
                  <p>
                    Vores forskellige fødselsdagsarrangementer giver dig mulighed for at vælge lige den oplevelse du gerne vil
                    have.
                  </p>
                </div>
                <div>
                  <Image
                    src={barnVr}
                    width={700}
                    height={700}
                    quality={60}
                    alt='barn der spiller i vr'
                  />
                </div>
              </div>
            </article>
            <article className='flex justify-center'>
              <div className='spacer w-full '>
                <h2>
                  priser på <span className=' text-accentCol'>fødselsdag</span>
                </h2>
                <div className='flex flex-col items-center md:items-stretch justify-around md:flex-row mt-10 gap-6'>
                  <Card
                    variant={'bday1'}
                    totalPris={120}
                  />
                  <Card
                    variant={'bday2'}
                    totalPris={150}
                  />
                </div>
              </div>
            </article>
            <article className='flex justify-center'>
              <div className='spacer flex flex-col md:flex-row w-full gap-14 md:mt-32'>
                <div>
                  <h3 className='md:mt-0'>Gamer's Paradise Birthday Bash</h3>
                  <p>
                    Giv fødselsdagsbarnet den ultimative gave med en Gamer's Paradise Birthday Bash! Vores gaming center er det
                    perfekte sted at fejre med venner og familie. Vi sørger for en dag fyldt med sjove gaming-aktiviteter, lækker
                    festmad og drikke, og selvfølgelig en overdådig kage! Lad os skabe den perfekte ramme for en fødselsdag, der
                    vil blive husket længe. Vi tilpasser arrangementet til fødselsdagsbarnets ønsker og sørger for, at alle får en
                    fantastisk tid. Tillykke med fødselsdagen – lad os game!
                  </p>
                </div>
                <div className='md:max-w-[40%]'>
                  <Image
                    className='mt-6 md:mt-0'
                    src={foedselsdagImg1}
                    width={1000}
                    height={1000}
                    alt='gutter der spiller'
                  />
                </div>
              </div>
            </article>

            <article className='flex justify-center'>
              <div className='spacer flex flex-col md:flex-row w-full gap-14 md:mt-20'>
                <div className='md:max-w-[40%] md:order-1 order-2 mt-6 md:mt-0 '>
                  <Image
                    className=' '
                    src={foedselsdagImg2}
                    width={1000}
                    height={1000}
                    alt='gutter der spiller'
                  />
                </div>
                <div className='order-1 md:order-2'>
                  <h3 className='md:mt-0'>Game On, Party On!</h3>
                  <p>
                    Gør fødselsdagen ekstra speciel med vores 'Game On, Party On!' pakke. Vi forvandler vores gaming center til en
                    festlig oase, hvor fødselsdagsbarnet og gæsterne kan nyde en dag med gaming, sjove aktiviteter og lækker mad.
                    Fra turneringer til virtual reality-oplevelser tilbyder vi en bred vifte af underholdning for alle aldre. Lad
                    os tage hånd om alle detaljer, så I kan fokusere på at fejre og have det sjovt. Book jeres fødselsdagsfest hos
                    os og lad festlighederne begynde!
                  </p>
                </div>
              </div>
            </article>
          </section>
          <section>
            <RelatedContact
              header='Du kan altid kontakte os'
              redWord={['kontakte', 'os']}
              subHeader='har du spørgsmål til dit kommende Børne fødselsdag?'
              content='Hvis du har spørgsmål omkring vores fødselsdagsarrangementer kan du altid skrive til os. Ser du ikke præcis det event som du havde forventet, så kan du selvfølgelig altid kontakte os'
              buttonProps={{
                children: 'Kontakt os om fødselsdag ',
                link: '../om-os/kontakt?foedselsdag',
              }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
