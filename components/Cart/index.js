import { connect } from 'react-redux';

import Cart from './Cart';
import {addToCart, removeFromCart, setCount} from "../../redux/reducers/cart";

const mapStateToProps = (state) => {
  const { cart: { items, isOpenCart }, products: { currency } } = state
  return {
    cart: items,
    isOpenCart,
    currency,
    total: items.reduce((total, item) => (item.priceUAH * ((item.discount && item.discount > 0) ? (1-item.discount) : 1) * item.count) + total, 0)
  }
}
  
const mapDispatchToProps = { addToCart, removeFromCart, setCount }

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
