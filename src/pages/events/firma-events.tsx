import { Layout } from '@/Layout';
import { Hero } from '@/modules/Hero/Hero';
import Image from 'next/image';
import firmaEvent from '../../../public/images/event/firma-event.jpg';
import { RelatedContact } from '../../components/RelatedContact/RelatedContact';

export default function FirmaEvents() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            isFrontPage={false}
            header='professionelle firma events'
            redWord={['firma', 'events']}
            content='Gaming er for alle! Med vores firma events har vi skabt et koncept som giver virksomheder et alternativ til de klassiske oplevelser. Vi har skabt en oplevelse i særklasse hvor alle kan være med ligemeget om du er nybegynder, eller rutineret gamer.'
            link='../om-os/kontakt?firma-event'
            buttonProps={{
              children: 'Kontakt os om event',
              link: '../om-os/kontakt?firma-event',
            }}
          />
          <section>
            <article className='flex justify-center'>
              <div className='spacer w-full'>
                <h2>
                  Dit næste firma <span className='text-accentCol'>event</span>
                </h2>

                <div className='flex flex-col md:flex-row gap-14 md:mt-10'>
                  <div>
                    <h3 className='md:mt-0'>
                      Det perfekte sociale arrangement til kolleger
                    </h3>
                    <p>
                      Skal dit næste firma event holdes hos Next Level Gaming?
                      Du har deltagerne og vi har rammerne. Vi lever for at give
                      jer den bedste gamingoplevelse i Danmark. Hvis i ønsker at
                      skræddersy jeres oplevelse, er vi altid klar på det!
                    </p>
                  </div>
                  <div>
                    <Image
                      src={firmaEvent}
                      width={1000}
                      height={1000}
                      alt='mænd der spiller computer'
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section>
            <div className='flex justify-center'>
              <h2 className='spacer w-full'>
                Eksempler på tidligere{' '}
                <span className=' text-accentCol'>Firma events</span>
              </h2>
            </div>
            <article className='flex justify-center'>
              <div className='spacer flex flex-col md:flex-row w-full gap-14 md:mt-32'>
                <div>
                  <h3 className='md:mt-0'>Strategi og sjov på jobbet</h3>
                  <p>
                    Giv jeres team en dag med strategi og sjov på jobbet med
                    vores specialdesignede firmaevent. Vores gaming center
                    tilbyder skræddersyede aktiviteter, der kombinerer teamwork
                    og konkurrence. Uanset om I er nybegyndere eller erfarne
                    gamere, vil I opleve en dag, der styrker samarbejdet,
                    fremmer kreativitet og skaber gode minder. Vi sørger for alt
                    fra lækker forplejning til professionel instruktion, så I
                    kan fokusere på at have det sjovt og styrke båndene på
                    arbejdspladsen.
                  </p>
                </div>
                <div className='md:max-w-[40%]'>
                  <Image
                    className='mt-6 md:mt-0'
                    src={firmaEvent}
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
                    src={firmaEvent}
                    width={1000}
                    height={1000}
                    alt='gutter der spiller'
                  />
                </div>
                <div className='order-1 md:order-2'>
                  <h3 className='md:mt-0'>Powerplay team building</h3>
                  <p>
                    Skru op for samarbejdet og kickstart jeres næste firmaevent
                    med et PowerPlay Team Building arrangement! Vores gaming
                    center er det perfekte sted at styrke teamet, mens I nyder
                    spændende turneringer, lækker forplejning og en afslappet
                    atmosfære. Vi tilpasser arrangementet til jeres behov, så I
                    får en dag fyldt med sjov, fællesskab og enestående
                    gaming-oplevelser. Lad os skabe et mindeværdigt event, der
                    bringer jeres team tættere sammen!
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section>
            <RelatedContact
              header='Du kan altid kontakte os'
              redWord={['kontakte', 'os']}
              subHeader='har du spørgsmål til dit kommende firma event?'
              content='Har du spørgsmål angående vores events, så kontakt os her.'
              buttonProps={{
                children: 'Kontakt om firma event ',
                link: '../om-os/kontakt?firma-event',
              }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
