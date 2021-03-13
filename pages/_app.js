
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { useStore } from '../redux/store'
import { REHYDRATE } from '../redux/reducers/cart'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  useEffect(() => {
    const { cart } = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('storeShop') || '{}') : {}
    if(cart) store.dispatch(REHYDRATE(cart))
    
    store.subscribe(() => {
      const { cart } = store.getState()
      localStorage.setItem('storeShop', JSON.stringify({ cart }))
    })
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
