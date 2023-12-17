import { Layout } from '@/Layout';
import { Card } from '@/components/Cards/Card';
import { EventCard } from '@/components/Cards/EventCard';
import { Hero } from '@/modules/Hero/Hero';
import { link } from 'fs';
import { Button } from '../components/Button/Button';
import { RelatedContact } from '@/components/RelatedContact/RelatedContact';
import Head from 'next/head';

export default function Events() {
  return (
    <>
      <Head>
        <title>Next Level Gaming Events: Spændende Gaming Oplevelser i Glostrup</title>
        <meta
          name='description'
          content='Oplev unikke gaming events hos Next Level Gaming. Fra børnefødselsdage til firmaarrangementer, tilbyder vi en bred vifte af skræddersyede gaming events. Perfekt for alle aldre og færdighedsniveauer. Kontakt os for at arrangere dit næste mindeværdige event i Glostrup.'
        />
      </Head>
      <Layout>
        <main>
          <Hero
            header='Top tier gaming events'
            redWord={['gaming']}
            isFrontPage={false}
            content='Vi holder de fedeste gaming events i vores gaming center i Glostrup. Alt du skal gøre er at kontakte os omkring hvilket event du godt kunne tænke dig at holde. Vi holder en række forskellige events alt fra børnefødselsdage til firma events og alt derimellem. Synes du der mangler noget, så hjælper vi også gerne med at arrangere lige dét event du ønsker'
            buttonProps={{ children: 'Kontakt os' }}
            link='./om-os/kontakt'
          />
          <section>
            <article className='flex justify-center'>
              <div className='spacer w-full'>
                <div>
                  <h2 className=' hyphens-auto'>
                    Forskellige typer <span className='text-accentCol'>events</span>
                  </h2>
                  <p>
                    Som standard udbyder vi en række forskellige events, der kan tilpasses enhver smag og interesse. Hvis du har
                    et specifikt ønske eller ideer til et skræddersyet event, der passer perfekt til dine behov, er du meget
                    velkommen til at{' '}
                    <a
                      className='text-accentCol'
                      href='/om-os/kontakt'
                    >
                      skrive til os.
                    </a>{' '}
                    Vores team er klar til at hjælpe med at realisere dine ideer og skabe en uforglemmelig oplevelse.
                  </p>

                  <div className=' flex flex-col items-center md:items-stretch md:flex-row md:flex-wrap gap-6 mt-10 md:mt-16 justify-around md:gap-10'>
                    <EventCard
                      header='Børne - Fødselsdag'
                      content='Vores børnefødselsdage er et hit! Gaming er en aktivitet, som hele familien kan nyde sammen, og det at kunne give denne glæde videre til vores børn gennem vores velorganiserede og underholdende børnefødselsdage er noget, vi sætter stor pris på. Det skaber uforglemmelige minder og styrker båndet mellem generationerne, mens det også introducerer dem til den spændende verden af gaming.'
                      image='foedselsdag'
                      buttonProps={{
                        children: `Læs mere om fødselsdage`,
                        link: '/events/foedselsdag',
                      }}
                    />
                    <EventCard
                      header='Firma Event'
                      content='Gaming er for alle! Med vores firma events har vi skabt et innovativt og inkluderende koncept, som tilbyder virksomheder et spændende og unikt alternativ til de traditionelle firmaarrangementer. Vi har designet en oplevelse, der er tilgængelig for alle, uanset om du er nybegynder eller en erfaren gamer. Vores mål er at sammenbringe mennesker gennem spændingen og sjov ved gaming, og at skabe mindeværdige øjeblikke, der fremmer samarbejde og teambuilding.
                      '
                      image='firma'
                      buttonProps={{
                        children: `Læs mere om Firma Events`,
                        link: '/events/firma-events',
                      }}
                    />
                    <EventCard
                      header='Turnering'
                      content='Vi afholder de fedeste turneringer, med de bedste præmier, der tiltrækker spillere og fans fra hele verden. Vi specialiserer os i populære spil som Counter-Strike, League of Legends, Dota 2 og mange flere, og sikrer en uforglemmelig oplevelse med intens konkurrence og fantastiske præmier. Vores turneringer er kendt for deres høje kvalitet og spændende atmosfære, hvilket gør dem til et must for alle gaming-entusiaster.'
                      image='turnering'
                      buttonProps={{
                        children: `Læs mere om turneringer`,
                        link: '/events/turneringer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section>
            <RelatedContact
              header='Du kan altid kontakte os'
              redWord={['kontakte', 'os']}
              subHeader='har du spørgsmål til dit kommende event?'
              content='Ønsker du at afholde en børnefødselsdag, firma event, polterabend, eller noget helt andet unikt og mindeværdigt? Så tøv ikke med at kontakte os. Vi er specialister i at skabe skræddersyede arrangementer og vil gå langt for at give dig og dine gæster den bedste gaming oplevelse. Vores dedikerede team er klar til at hjælpe med alle detaljer og sikre, at dit arrangement bliver en succes.'
              buttonProps={{
                children: 'Kontakt os om events',
                link: '../om-os/kontakt?andet',
              }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
