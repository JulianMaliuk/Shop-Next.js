import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import Product from './Product';
import {setCurrency} from "../../redux/reducers/products";

const mapStateToProps = (state) => {
  const { products: { currency } } = state
  return {
    currency,
  }
}

const mapDispatchToProps = { setCurrency }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
