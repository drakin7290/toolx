import { createContext, useState, useEffect } from 'react';
import { ListText, LANGUAGE_AVAILABLE } from './ListText';
import { CURRENT_LANG_KEY } from '../defaultConst';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import fetchApiUser from '~/utils/fetchApi/fetchApiUser';

export const TransContext = createContext();

const TransProvider = ({ children }) => {
  const router = useRouter();

  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const valueCookie = getCookie(CURRENT_LANG_KEY);
    const languageBrowser = window.navigator.userLanguage || window.navigator.language;

    if (valueCookie) {
      setCurrentLang(valueCookie || 'en');
    } else {
      if (languageBrowser) {
        let browserLang = LANGUAGE_AVAILABLE.includes(languageBrowser.slice(0, 2)) ? languageBrowser.slice(0, 2) : 'en';
        setCurrentLang(browserLang);
        setCookie(CURRENT_LANG_KEY, browserLang);
        router.push(window.location.pathname);
      }
      // else {
      //   fetchApiUser((payload) => {
      //     let codeLang = LANGUAGE_AVAILABLE.includes(payload?.location?.language?.code)
      //       ? payload?.location?.language?.code
      //       : 'en';
      //     setCurrentLang(codeLang);
      //     setCookie(CURRENT_LANG_KEY, codeLang);
      //     router.push(window.location.pathname);
      //   });
      // }
      const d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = CURRENT_LANG_KEY + '=' + getCookie(CURRENT_LANG_KEY) + ';' + expires;
    }
  }, []);
  return <TransContext.Provider value={ListText[currentLang]}>{children}</TransContext.Provider>;
};

export default TransProvider;
