import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import Product from './Product';

const mapStateToProps = (state) => {
  const { products: { currency } } = state
  return {
    currency,
  }
}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
