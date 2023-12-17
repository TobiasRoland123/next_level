import { Layout } from '@/Layout';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';
import { InfoBox } from '@/components/InfoBox/InfoBox';
import { ParagraphBold } from '@/components/ParagraphBold/ParagraphBold';
import { EventBanner } from '@/modules/EventBanner/EventBanner';
import { Hero } from '@/modules/Hero/Hero';
import Head from 'next/head';
import { Children } from 'react';
import { MdCheck } from 'react-icons/md';

export default function Priser() {
  return (
    <>
      <Head>
        <title>Next Level Gaming Priser: Overkommelige Gaming Oplevelser for Alle</title>
        <meta
          name='description'
          content='Opdag attraktive priser på gaming hos Next Level Gaming. Vælg mellem gæstepriser og medlemsfordele for den bedste gaming tid. Uanset om du er hardcore gamer eller nybegynder, tilbyder vi pakker og timepriser, der passer til dit behov. Besøg os for en prisvenlig og kvalitets gamingoplevelse i Glostrup.'
        />
      </Head>
      <Layout>
        <main>
          <Hero
            isFrontPage={false}
            buttonProps={{ children: 'Se priserne', link: '#priser' }}
            content='De skarpeste priser på den ultimative gaming oplevelse. Vi har sørget for at alle kan være med. Hos os kan du komme direkte fra gaden, eller booke din tid i forvejen. Vi har både en gæstepris og der er også penge at spare hvis du vælger en af vores favorable pakker på timer.'
            header='DK’S mest op
priser på gaming'
            redWord={['op']}
          />

          <section className='flex justify-center flex-col items-center'>
            <article className=' md:flex spacer justify-between gap-14'>
              <div>
                <h2>
                  Next Level <span className='text-accentCol'>priser</span>
                </h2>
                <p>
                  Hos Next Level kan du både spille som gæst eller medlem. Som medlem får du de bedste priser på din gaming tid.
                  Uanset om du er gæst eller medlem får du de samme gode rammer, for at nyde din oplevelse hos os. Vi gør ikke
                  forskel!
                </p>
                <Button
                  variant={'secondary'}
                  link='#medlemspriser'
                >
                  Se vores medlemspriser
                </Button>
              </div>
              <InfoBox className='text-center md:mt-0 lg:max-w-[33%] h-fit'>
                <h3
                  className='mt-0 hyphens-auto'
                  lang='da'
                >
                  Timepris for ikke medlemmer
                </h3>
                <p className=' text-4xl font-bold'>20,-</p>
              </InfoBox>
            </article>
          </section>
          <section id='medlemspriser'>
            <div className='flex justify-center'>
              <h2
                className=' spacer w-full hyphens-auto'
                lang='da'
              >
                Next Level <span className='text-accentCol'>Medlemskaber</span>
              </h2>
            </div>
            <article className='flex justify-center'>
              <div className='spacer w-full flex flex-col md:flex-row md:gap-20 md:mt-10 justify-between '>
                <div>
                  <ParagraphBold
                    underlined
                    text='Hvad får du som medlem?'
                  />
                  <p className=' mt-8'>
                    Medlemsskabet du har ventet på. Vi lover at når du er medlem får du de bedste priser og nogle fede fordele med
                    oven i hatten. Et medlemsskab koster kun 35,- og sikrer dig adgang til vores medlemspriser.
                  </p>
                </div>
                <InfoBox className='md:mt-0 h-fit'>
                  <h3
                    className='mt-0 text-2xl font-bold hyphens-auto'
                    lang='da'
                  >
                    Bliv medlem hos next level
                  </h3>

                  <ul className='mt-6 gap-3 flex flex-col'>
                    <li className='flex gap-6 items-center'>
                      <MdCheck className='w-6 text-[#36DF5B] h-auto' />
                      <p className='mt-0'>Fordelagtige medlemspriser</p>
                    </li>
                    <li className='flex gap-6 items-center'>
                      <MdCheck className='w-6 text-[#36DF5B] h-auto' />
                      <p className='mt-0'>1 gratis drikkevarer ved hvert besøg</p>
                    </li>
                    <li className='flex gap-6 items-center'>
                      <MdCheck className='w-6 text-[#36DF5B] h-auto' />
                      <p className='mt-0'>Tag en ven med gratis én gang om måneden</p>
                    </li>
                    <li className='flex gap-6 items-center'>
                      <MdCheck className='w-6 text-[#36DF5B] h-auto' />
                      <p className='mt-0'>Fortrinsret ved turneringer</p>
                    </li>
                  </ul>
                  <p className=' text-4xl font-bold text-center'>35 ,-</p>
                </InfoBox>
              </div>
            </article>
          </section>
          <section id='priser'>
            <article className='flex justify-center'>
              <div className='spacer w-full'>
                <h3>Dækker de fleste behov</h3>
                <p>
                  Perfekt til en hurtig gamingsession. Vores Level pakker dækker langt de fleste behov. Det er uanset om du er på
                  udkig efter en hurtigt session, eller gerne fordele dine timer ud på flere sessioner.{' '}
                </p>
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
              </div>
            </article>
            <article className='flex justify-center'>
              <div className='spacer w-full'>
                <h3>Til den der ikke kan få nok</h3>
                <p>
                  Perfekt til en hurtig gamingsession. Vores Level pakker dækker langt de fleste behov. Det er uanset om du er på
                  udkig efter en hurtigt session, eller gerne fordele dine timer ud på flere sessioner.{' '}
                </p>
                <div className='flex justify-center md:justify-around flex-wrap md:flex-row mt-14 md:mt-20 gap-10'>
                  <Card
                    variant={'expert'}
                    header='Expert'
                    timeAntal={50}
                    totalPris={450}
                    oprettelseInkl={false}
                  />
                  <Card
                    variant={'master'}
                    header='Master'
                    timeAntal={100}
                    totalPris={700}
                    oprettelseInkl={false}
                  />
                </div>
              </div>
            </article>
            <article className='flex justify-center'>
              <div className='spacer w-full'>
                <h3>Noget helt specielt?</h3>

                <div className='mt-14 md:mt-20'>
                  <Card
                    variant={'nlp'}
                    timePris={30}
                    header='NLP rum'
                  />
                </div>
              </div>
            </article>
          </section>
          <section className='flex justify-center'>
            <EventBanner
              className='spacer w-full'
              heading='Vores events'
              text='Vi holder de fedeste gaming events i vores gaming center i Glostrup. Alt du skal gøre er at kontakte os omkring hvilket event du godt kunne tænke dig at holde. Vi holder en række forskellige events alt fra børnefødselsdage til firma events og alt derimellem. Synes du der mangler noget, så hjælper vi også gerne med at arrangere lige dét event du ønsker.'
              button={{
                children: 'Læs om vores events',
                link: '../events',
                variant: 'secondary',
              }}
              image='firmaEvent'
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
