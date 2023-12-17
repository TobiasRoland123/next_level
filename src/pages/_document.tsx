import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='da'>
      <Head>
        <title>Next Level Gaming: Danmarks Førende Gaming Center</title>
        <meta
          name='description'
          content='Next level er din netcafe., hvor du kan komme og hænge ud samt bruge tid med dine venner. Next level afholder også turneringer og arrangementer for både børn og voksne
        '
        ></meta>
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
