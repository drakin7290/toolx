import Head from 'next/head';

import Footer from '~/components/common/Footer';
import Header from '~/components/common/Header';

import styles from './styles.module.scss';
import icon from '~/public/favicon.ico';
// import headerBg from '~/public/imgs/background/header-bg.png';
import ScrollToTop from '~/components/common/ScrollToTop';
import { nameWeb } from '~/core/contants';
import LayoutChildren from './LayoutChildren';
import MessengerFb from '~/components/common/MessengerFb';

export default function MainLayout({ children, title = '', currentPage = '', data = null, meta_data = null }) {
  const titlePage = !!title ? `${nameWeb} - ` + title : nameWeb;
  const description = ''
  const thumbnail = ''
  return (
    <>
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-BDHNFW2Q5M" />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'G-BDHNFW2Q5M');",
        }}
      ></script> */}
      <Head>
        <title>{titlePage}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="description"
          content={description}
        />
        <meta
          property="og:description"
          content={description}
        />
        <meta name='twitter:description' content={description} />
        <meta
          property="og:title"
          content={titlePage}
        />
        <meta
          name="title"
          content={titlePage}
        />
        <meta
          name="twitter:title"
          content={titlePage}
        />

        <meta itemProp="image" content={thumbnail} />
        <meta property="og:image" content={thumbnail} />
        <meta name="twitter:image" content={thumbnail} />


        <meta name='og:image:alt' content={titlePage} />
        <meta property="og:url" content={typeof window != 'undefined' ? window.location.href : ''} />
        <meta
          property="og:tag"
          content={`${meta_data?.tag?.map((item, index) => {
            return item;
          })}`}
        />

        <meta name="og:type" content={!!meta_data ? 'article' : 'website'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={nameWeb} />
        <meta name="apple-mobile-web-app-title" content={nameWeb} />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      </Head>

      <div className={`${styles['body']}`}>
        <Header currentPage={currentPage} />
        <MessengerFb />
        <main className={`${styles['main']}`}>
          <LayoutChildren>
            {children}
          </LayoutChildren>
        </main>
        <Footer />
        {/* <ScrollToTop /> */}
      </div>
    </>
  );
}
