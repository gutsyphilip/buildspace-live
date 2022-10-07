import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SEO from '../design-system/SEO';
import { globalStyles } from '../styles/globalStyles'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles()
  const [showChild, setShowChild] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    setShowChild(true);
  }, []);


  return <>
    <SEO />
    <Navbar/>
    {showChild && getLayout(<Component {...pageProps} />)}
  </>
}

export default MyApp
