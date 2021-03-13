import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import _ from 'lodash';

// const debounce = (func, wait) => {
//   let timeout;

//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

export default class Search extends Component {

  state = {
    value: this.props.searchQuery,
    isLoading: false
  };

  runSearch = _.debounce((value) => {
    this.props.setSearchQuery(value);
    this.setState({ isLoading: false })
  }, 400)

  handleChange = ({target: {value}}) => {
    this.setState({ value, isLoading: true })
    this.runSearch(value);
  }

  clearSearch = () => {
    this.setState({ value: '' })
    this.props.setSearchQuery('');
  }

  render() {
    const { value, isLoading } = this.state
    return (
      <Input 
        action={{
          icon: 'remove',
          onClick: () => this.clearSearch(),
        }}
        fluid
        iconPosition='left'
        placeholder='Пошук...' 
        loading={isLoading}
        value={value} 
        onChange={this.handleChange} />
    )
  }
}
