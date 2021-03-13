import { connect } from 'react-redux';

import Filter from './Filter';

const mapStateToProps = (state) => {
  const { categories } = state.products
  return {
    categories
  }
}

export default connect(mapStateToProps, null)(Filter);