import { Hero } from '@/modules/Hero/Hero';
import Image from 'next/image';
import { FaHouse, FaPhone, FaClock, FaPeopleGroup } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import ParkMap from '../../public/images/parkmap.png';
import { Layout } from '@/Layout';
export default function OmOs() {
  return (
    <>
      <Head>
        <title>Om Os: Next Level Gaming - Din Ultimative Gaming Destination i Glostrup</title>
        <meta
          name='description'
          content='Lær mere om Next Level Gaming, dit lokale gamingcenter i Glostrup. Vi tilbyder den bedste gamingoplevelse med topmoderne udstyr og et dedikeret team af gamere. Vores vision er et inkluderende miljø, hvor alle er velkomne. Perfekt for afslapning, sammenhold og gaming uden lag. Besøg os for at opleve vores passion for gaming.'
        />
      </Head>
      <Layout>
        <main>
          <Hero
            header='Hvem er next level?'
            redWord={['next', 'level?']}
            isFrontPage={false}
            content='“Strength in unity, my friends.” Vi er et lille dedikeret hold. Vi lever af og for at give den bedste gaming oplevelse der findes. Vi er selv inkarnerede gamere og har mange nederlag og sejre under bæltet. Vi giver aldrig op, og kæmper hele tiden for at forbedre vores gaming center.'
          />

          <section className='grid'>
            <div className='flex justify-center'>
              <h2
                className='spacer w-full hyphens-auto'
                lang='da'
              >
                Next Level, dit <span className='text-accentCol'>gamingcenter</span>
              </h2>
            </div>

            <article className='flex justify-center  '>
              <div className='spacer w-full md:flex gap-14'>
                <div
                  className='mt-0 md:-mt-14 md:order-2 
          '
                >
                  <Image
                    src={ParkMap}
                    width={450}
                    height={450}
                    quality={30}
                    alt='Et kort, som viser hvilke muligheder der er for parkering'
                  />
                </div>

                <div className=' mt-6 md:mt-0'>
                  <h3 className='mt-0'>find os her</h3>
                  <p>
                    Vores <span className='italic'>base of operation</span> ligger i Glostrup. Her har vi skabt, hvad vi mener, er
                    muligvis den bedste gamingoplevelse i Danmark. Vi har gæster i alle aldre, som spiller lige fra et par timer
                    til hele natten. Vi har åbent når du har mest lyst til at game, og det har vi haft siden dag ét.
                  </p>

                  <h4>Her kan du parkere</h4>
                  <ul className='flex flex-col pt-4 gap-4'>
                    <li>
                      <span className='text-accentCol font-bold uppercase'>Rød zone</span> - Parkering forbudt
                    </li>
                    <li>
                      <span className='text-[#2096EB] font-bold uppercase'>Blå zone</span> - Parkering mod betaling via app
                    </li>
                    <li>
                      <span className='text-[#52FF00] font-bold uppercase'>grøn zone</span> - Gratis parkering
                    </li>
                  </ul>
                  <div className='bg-contrastCol mt-8 p-4 hidden lg:block'>
                    <h4 className='mt-0'>Information</h4>
                    <ul className='flex flex-col sm:flex-row gap-16 '>
                      <li>
                        <ul>
                          <li>
                            <div className='flex items-start gap-4 mt-4 '>
                              <FaHouse className={'text-accentCol'} />
                              <a
                                className='mt-0 hyphens-auto'
                                lang='da'
                                href='https://maps.app.goo.gl/eKRjh2DJL8qw7nvX8'
                                target='_blank'
                              >
                                Hovedvejen 3A, <br /> 2600 Glostrup
                              </a>
                            </div>
                          </li>

                          <li>
                            <div className='flex items-center gap-4 mt-4'>
                              <FaPhone className={'text-accentCol'} />
                              <a
                                className='mt-0 hyphens-auto'
                                lang='da'
                                href='tel:50988887'
                              >
                                50 98 88 87
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className='flex items-center gap-4 mt-4'>
                              <MdEmail className={'text-accentCol'} />
                              <a
                                className='mt-0 hyphens-auto'
                                lang='da'
                                href='mailto:info@nextlvl.dk'
                              >
                                info@nextlvl.dk
                              </a>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <div className='flex items-start gap-4 mt-4'>
                              <FaClock className={'text-accentCol'} />
                              <div className='flex flex-col gap-6'>
                                <div>
                                  <p className='font-bold mt-0'>Søndag til torsdag</p>
                                  <p className='mt-2 '>14:00 til 03:00</p>
                                </div>
                                <div>
                                  <p className='font-bold mt-0'>Fredag til Lørdag</p>
                                  <p className='mt-2 '>14:00 til 04:00</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
            <article className='flex justify-center lg:hidden'>
              <div className='spacer w-full !mt-0'>
                <div className='bg-contrastCol mt-8 p-4 md:max-w-[66%]'>
                  <h4 className='mt-0'>Information</h4>
                  <ul className='flex flex-col sm:flex-row gap-16 '>
                    <li>
                      <ul>
                        <li>
                          <div className='flex items-start gap-4 mt-4 '>
                            <FaHouse className={'text-accentCol'} />
                            <p
                              className='mt-0 hyphens-auto'
                              lang='da'
                            >
                              Hovedvejen 3A, <br /> 2600 Glostrup
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className='flex items-center gap-4 mt-4'>
                            <FaPhone className={'text-accentCol'} />
                            <a
                              className='mt-0 hyphens-auto'
                              lang='da'
                              href='tel:50988887'
                            >
                              50 98 88 87
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className='flex items-center gap-4 mt-4'>
                            <MdEmail className={'text-accentCol'} />
                            <a
                              className='mt-0 hyphens-auto'
                              lang='da'
                              href='mailto:info@nextlvl.dk'
                            >
                              info@nextlvl.dk
                            </a>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <div className='flex items-start gap-4 mt-4'>
                            <FaClock className={'text-accentCol'} />
                            <div className='flex flex-col gap-6'>
                              <div>
                                <p className='font-bold mt-0'>Søndag til torsdag</p>
                                <p className='mt-2 '>14:00 til 03:00</p>
                              </div>
                              <div>
                                <p className='font-bold mt-0'>Fredag til Lørdag</p>
                                <p className='mt-2 '>14:00 til 04:00</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            <section className=''>
              <section className='flex justify-center'>
                <div className='spacer w-full'>
                  <div className=' grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                    <div className=' col-start-1 '>
                      <h2>
                        Next level <span className='text-accentCol'>Vision</span>
                      </h2>
                      <p>
                        Vores vision er et gaming center hvor der er plads til alle. Dette gælder også din personlighed. Vi har
                        sørget for plads ved computerne, men også til sejre og nederlag. Vi har skabt det vi mener er de perfekte
                        rammer for hvordan et gaming center skal være.
                      </p>
                    </div>
                    <div className='aspect-video col-start-1 md:col-start-1 lg:col-start-2'>
                      <iframe
                        className='w-full h-full'
                        src='https://www.youtube.com/embed/Usy96kk_Wcs?si=D4hXtrbwk3XWV_OY'
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      />
                    </div>
                  </div>
                </div>
              </section>

              <article className='flex justify-center '>
                <div className='spacer w-full'>
                  <h2
                    className=' hyphens-auto'
                    lang='da'
                  >
                    vores <span className='text-accentCol'>Nøgleværdier</span>
                  </h2>
                  <ul className='flex flex-col gap-16 md:grid grid-rows-2 grid-cols-3'>
                    <li className='text-center mt-8 col-start-2'>
                      <figure className='flex justify-center '>
                        <svg
                          width='121'
                          height='60'
                          viewBox='0 0 121 60'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M0.474609 59.0625V51.3105C0.474609 47.7832 2.30794 44.9121 5.97461 42.6973C9.64128 40.4824 14.4746 39.375 20.4746 39.375C21.5579 39.375 22.5996 39.3955 23.5996 39.4365C24.5996 39.4775 25.5579 39.5801 26.4746 39.7441C25.3079 41.4668 24.4329 43.2715 23.8496 45.1582C23.2663 47.0449 22.9746 49.0137 22.9746 51.0645V59.0625H0.474609ZM30.4746 59.0625V51.0645C30.4746 48.4395 31.2038 46.04 32.6621 43.8662C34.1204 41.6924 36.1829 39.7852 38.8496 38.1445C41.5163 36.5039 44.7038 35.2734 48.4121 34.4531C52.1204 33.6328 56.1413 33.2227 60.4746 33.2227C64.8913 33.2227 68.9538 33.6328 72.6621 34.4531C76.3704 35.2734 79.558 36.5039 82.2246 38.1445C84.8913 39.7852 86.9329 41.6924 88.3496 43.8662C89.7663 46.04 90.4746 48.4395 90.4746 51.0645V59.0625H30.4746ZM97.9746 59.0625V51.0645C97.9746 48.9316 97.7038 46.9219 97.1621 45.0352C96.6204 43.1484 95.8079 41.3848 94.7246 39.7441C95.6413 39.5801 96.5788 39.4775 97.5371 39.4365C98.4954 39.3955 99.4746 39.375 100.475 39.375C106.475 39.375 111.308 40.4619 114.975 42.6357C118.641 44.8096 120.475 47.7012 120.475 51.3105V59.0625H97.9746ZM41.0996 49.2188H79.9746C79.1413 47.5781 76.8288 46.1426 73.0371 44.9121C69.2454 43.6816 65.0579 43.0664 60.4746 43.0664C55.8913 43.0664 51.7038 43.6816 47.9121 44.9121C44.1204 46.1426 41.8496 47.5781 41.0996 49.2188ZM20.4746 34.4531C17.7246 34.4531 15.3704 33.4893 13.4121 31.5615C11.4538 29.6338 10.4746 27.3164 10.4746 24.6094C10.4746 21.8203 11.4538 19.4824 13.4121 17.5957C15.3704 15.709 17.7246 14.7656 20.4746 14.7656C23.3079 14.7656 25.6829 15.709 27.5996 17.5957C29.5163 19.4824 30.4746 21.8203 30.4746 24.6094C30.4746 27.3164 29.5163 29.6338 27.5996 31.5615C25.6829 33.4893 23.3079 34.4531 20.4746 34.4531ZM100.475 34.4531C97.7246 34.4531 95.3704 33.4893 93.4121 31.5615C91.4538 29.6338 90.4746 27.3164 90.4746 24.6094C90.4746 21.8203 91.4538 19.4824 93.4121 17.5957C95.3704 15.709 97.7246 14.7656 100.475 14.7656C103.308 14.7656 105.683 15.709 107.6 17.5957C109.516 19.4824 110.475 21.8203 110.475 24.6094C110.475 27.3164 109.516 29.6338 107.6 31.5615C105.683 33.4893 103.308 34.4531 100.475 34.4531ZM60.4746 29.5312C56.3079 29.5312 52.7663 28.0957 49.8496 25.2246C46.9329 22.3535 45.4746 18.8672 45.4746 14.7656C45.4746 10.582 46.9329 7.0752 49.8496 4.24512C52.7663 1.41504 56.3079 0 60.4746 0C64.7246 0 68.2871 1.41504 71.1621 4.24512C74.0371 7.0752 75.4746 10.582 75.4746 14.7656C75.4746 18.8672 74.0371 22.3535 71.1621 25.2246C68.2871 28.0957 64.7246 29.5312 60.4746 29.5312ZM60.4746 19.6875C61.8913 19.6875 63.0788 19.2158 64.0371 18.2725C64.9954 17.3291 65.4746 16.1602 65.4746 14.7656C65.4746 13.3711 64.9954 12.2021 64.0371 11.2588C63.0788 10.3154 61.8913 9.84375 60.4746 9.84375C59.0579 9.84375 57.8704 10.3154 56.9121 11.2588C55.9538 12.2021 55.4746 13.3711 55.4746 14.7656C55.4746 16.1602 55.9538 17.3291 56.9121 18.2725C57.8704 19.2158 59.0579 19.6875 60.4746 19.6875Z'
                            fill='#FF0C1E'
                          />
                        </svg>
                      </figure>
                      <h3
                        className='mt-3 hyphens-auto'
                        lang='da'
                      >
                        Sammenhold
                      </h3>
                      <p className='mt-2'>
                        Hos Next Level står vi sammen. Vi går op i at alle er velkomne og siger “nej tak” til diskrimination både
                        fysisk og online.
                      </p>
                    </li>
                    <li className='text-center row-start-2 col-start-1 '>
                      <figure className='flex justify-center'>
                        <svg
                          width='88'
                          height='72'
                          viewBox='0 0 88 72'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M15.8545 71.2C14.7315 71.2 13.7902 70.8209 13.0305 70.0628C12.2708 69.3046 11.8909 68.3652 11.8909 67.2444V63.2889C8.58788 63.2889 5.7803 62.1352 3.46818 59.8278C1.15606 57.5204 0 54.7185 0 51.4222V31.6444C0 28.3481 1.15606 25.5463 3.46818 23.2389C5.7803 20.9315 8.58788 19.7778 11.8909 19.7778V11.8667C11.8909 8.57037 13.047 5.76852 15.3591 3.46111C17.6712 1.1537 20.4788 0 23.7818 0H63.4182C66.7212 0 69.5288 1.1537 71.8409 3.46111C74.153 5.76852 75.3091 8.57037 75.3091 11.8667V19.7778C78.6121 19.7778 81.4197 20.9315 83.7318 23.2389C86.0439 25.5463 87.2 28.3481 87.2 31.6444V51.4222C87.2 54.7185 86.0439 57.5204 83.7318 59.8278C81.4197 62.1352 78.6121 63.2889 75.3091 63.2889V67.2444C75.3091 68.3652 74.9292 69.3046 74.1695 70.0628C73.4098 70.8209 72.4685 71.2 71.3455 71.2C70.2224 71.2 69.2811 70.8209 68.5214 70.0628C67.7617 69.3046 67.3818 68.3652 67.3818 67.2444V63.2889H19.8182V67.2444C19.8182 68.3652 19.4383 69.3046 18.6786 70.0628C17.9189 70.8209 16.9776 71.2 15.8545 71.2ZM11.8909 55.3778H75.3091C76.4321 55.3778 77.3735 54.9987 78.1332 54.2406C78.8929 53.4824 79.2727 52.543 79.2727 51.4222V31.6444C79.2727 30.5237 78.8929 29.5843 78.1332 28.8261C77.3735 28.068 76.4321 27.6889 75.3091 27.6889C74.1861 27.6889 73.2447 28.068 72.485 28.8261C71.7253 29.5843 71.3455 30.5237 71.3455 31.6444V47.4667H15.8545V31.6444C15.8545 30.5237 15.4747 29.5843 14.715 28.8261C13.9553 28.068 13.0139 27.6889 11.8909 27.6889C10.7679 27.6889 9.82651 28.068 9.06682 28.8261C8.30712 29.5843 7.92727 30.5237 7.92727 31.6444V51.4222C7.92727 52.543 8.30712 53.4824 9.06682 54.2406C9.82651 54.9987 10.7679 55.3778 11.8909 55.3778ZM23.7818 39.5556H63.4182V31.6444C63.4182 29.8644 63.7815 28.2493 64.5082 26.7989C65.2348 25.3485 66.1927 24.063 67.3818 22.9422V11.8667C67.3818 10.7459 67.002 9.80648 66.2423 9.04833C65.4826 8.29018 64.5412 7.91111 63.4182 7.91111H23.7818C22.6588 7.91111 21.7174 8.29018 20.9577 9.04833C20.198 9.80648 19.8182 10.7459 19.8182 11.8667V22.9422C21.0073 24.063 21.9651 25.3485 22.6918 26.7989C23.4185 28.2493 23.7818 29.8644 23.7818 31.6444V39.5556Z'
                            fill='#FF0C1E'
                          />
                        </svg>
                      </figure>
                      <h3
                        className='mt-3 hyphens-auto'
                        lang='da'
                      >
                        afkobling
                      </h3>
                      <p className='mt-2'>
                        Måske det lyder lidt modsigende, da gaming ofte går hedt for sig. Men vi har skabt et frirum for dem som
                        mener at gaming kan være afslappende.
                      </p>
                    </li>
                    <li className='text-center row-start-2 col-start-3'>
                      <figure className='flex justify-center '>
                        <svg
                          width='100'
                          height='70'
                          viewBox='0 0 100 70'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12.7502 69.9999C8.5002 69.9999 5.20853 68.5207 2.8752 65.5624C0.541862 62.604 -0.333138 58.9999 0.250195 54.7499L5.5002 17.2499C6.2502 12.2499 8.47936 8.12488 12.1877 4.87488C15.896 1.62488 20.2502 -0.00012207 25.2502 -0.00012207H74.7502C79.7502 -0.00012207 84.1044 1.62488 87.8127 4.87488C91.521 8.12488 93.7502 12.2499 94.5002 17.2499L99.7502 54.7499C100.334 58.9999 99.4585 62.604 97.1252 65.5624C94.7919 68.5207 91.5002 69.9999 87.2502 69.9999C85.5002 69.9999 83.8752 69.6874 82.3752 69.0624C80.8752 68.4374 79.5002 67.4999 78.2502 66.2499L67.0002 54.9999H33.0002L21.7502 66.2499C20.5002 67.4999 19.1252 68.4374 17.6252 69.0624C16.1252 69.6874 14.5002 69.9999 12.7502 69.9999ZM14.7502 59.2499L29.0002 44.9999H71.0002L85.2502 59.2499C85.4169 59.4165 86.0835 59.6665 87.2502 59.9999C88.1669 59.9999 88.896 59.729 89.4377 59.1874C89.9794 58.6457 90.1669 57.9166 90.0002 56.9999L84.5002 18.4999C84.1669 16.0832 83.0835 14.0624 81.2502 12.4374C79.4169 10.8124 77.2502 9.99988 74.7502 9.99988H25.2502C22.7502 9.99988 20.5835 10.8124 18.7502 12.4374C16.9169 14.0624 15.8335 16.0832 15.5002 18.4999L10.0002 56.9999C9.83353 57.9166 10.021 58.6457 10.5627 59.1874C11.1044 59.729 11.8335 59.9999 12.7502 59.9999C12.9169 59.9999 13.5835 59.7499 14.7502 59.2499ZM75.0002 39.9999C76.4169 39.9999 77.6044 39.5207 78.5627 38.5624C79.521 37.604 80.0002 36.4165 80.0002 34.9999C80.0002 33.5832 79.521 32.3957 78.5627 31.4374C77.6044 30.479 76.4169 29.9999 75.0002 29.9999C73.5835 29.9999 72.396 30.479 71.4377 31.4374C70.4794 32.3957 70.0002 33.5832 70.0002 34.9999C70.0002 36.4165 70.4794 37.604 71.4377 38.5624C72.396 39.5207 73.5835 39.9999 75.0002 39.9999ZM65.0002 24.9999C66.4169 24.9999 67.6044 24.5207 68.5627 23.5624C69.521 22.604 70.0002 21.4165 70.0002 19.9999C70.0002 18.5832 69.521 17.3957 68.5627 16.4374C67.6044 15.479 66.4169 14.9999 65.0002 14.9999C63.5835 14.9999 62.396 15.479 61.4377 16.4374C60.4794 17.3957 60.0002 18.5832 60.0002 19.9999C60.0002 21.4165 60.4794 22.604 61.4377 23.5624C62.396 24.5207 63.5835 24.9999 65.0002 24.9999ZM28.7502 39.9999H36.2502V31.2499H45.0002V23.7499H36.2502V14.9999H28.7502V23.7499H20.0002V31.2499H28.7502V39.9999Z'
                            fill='#FF0C1E'
                          />
                        </svg>
                      </figure>
                      <h3
                        className='mt-3 hyphens-auto'
                        lang='da'
                      >
                        Udstyr i top
                      </h3>
                      <p className='mt-2'>
                        Lag er et fremmedord for os. Vi sørger for lav ‘ping’ og har det bedste udstyr på markedet, så du ikke
                        bliver afbrudt af lagspikes eller
                      </p>
                    </li>
                  </ul>
                </div>
              </article>
            </section>
          </section>
        </main>
      </Layout>
    </>
  );
}
