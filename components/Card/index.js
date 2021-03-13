import { connect } from 'react-redux';
import _ from 'lodash';

import Card from './Card';
import {addToCart, setIsOpenCart} from "../../redux/reducers/cart";

const isInCart = (cart, id) => {
  const index = _.findIndex(cart, (o) => o.id === id )
  return index >= 0 ? true : false
}

const mapStateToProps = (state) => {
  const { cart: { items }, products: { currency } } = state
  return {
    cart: items,
    currency,
    isInCart: (cart, id) => isInCart(cart, id),
  }
}
  
const mapDispatchToProps = { addToCart, setIsOpenCart }

export default connect(mapStateToProps, mapDispatchToProps)(Card);
