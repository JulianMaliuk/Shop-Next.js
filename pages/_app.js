
import { useEffect } from 'react'
import ReactGA from 'react-ga';
import Router from 'next/router'
import NextNprogress from 'nextjs-progressbar';
import { REHYDRATE } from '../redux/reducers/cart'
import { wrapper } from '../redux/store';
import '../styles/globals.css'
import { useStore } from 'react-redux';

ReactGA.initialize('UA-129407988-1', {debug: false, testMode: process.env.NODE_ENV === 'test'});

function MyApp({ Component, pageProps, }) {
  const store = useStore()
  useEffect(() => {
    const { cart } = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('storeShop') || '{}') : {}
    if(cart) store.dispatch(REHYDRATE(cart))
    
    store.subscribe(() => {
      const { cart } = store.getState()
      localStorage.setItem('storeShop', JSON.stringify({ cart }))
    })

    Router.events.on('routeChangeComplete', (url) => {
      ReactGA.pageview(url)
    });
  }, []);

  return (
    <>
      <NextNprogress
        color="red"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
        options={{
          showSpinner: false
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
