
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga';
import Router from 'next/router'
import NextNprogress from 'nextjs-progressbar';
import { useStore } from '../redux/store'
import { REHYDRATE } from '../redux/reducers/cart'
import '../styles/globals.css'

ReactGA.initialize('UA-129407988-1', {debug: false, testMode: process.env.NODE_ENV === 'test'});

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
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
    <Provider store={store}>
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
    </Provider>
  )
}

export default MyApp
