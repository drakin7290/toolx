import '~/public/styles/globals.scss';
import { QueryClientProvider } from 'react-query';
import queryClient from '~/core/queryClient';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Progress } from '~/components/base/progress';
import { useProgressStore } from '~/store';
import { TransProvider } from '~/context/TransContext';
import { VisibilityProvider } from '~/context/VisibilityContext';
import 'moment/locale/vi';
import moment from 'moment';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  moment.locale('vi');
  const setIsAnimating = useProgressStore((state) => {
    if (state) {
      return state.setIsAnimating
    }
  });
  const isAnimating = useProgressStore((state) => {
    if (state) {
      return state.isAnimating
    }
  });
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Progress isAnimating={isAnimating} />
        <TransProvider>
          <VisibilityProvider>
            <Component {...pageProps} />
          </VisibilityProvider>
          <ToastContainer />
        </TransProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
