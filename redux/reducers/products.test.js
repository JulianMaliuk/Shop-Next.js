import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import reducer, { fetchProducts, initialState, setCurrency, setProducts, setSearchQuery } from './products'
import {API_URL} from "../constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore(initialState);

describe('products reducer', () => {

  beforeEach(() => {
    store.clearActions();
  });
    
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle setProducts', () => {
    expect(reducer(initialState, setProducts({
      products: [
        { id: '1', title: 'One', available: false, preOrder: true },
        { id: '2', title: 'Two', available: false, preOrder: false },
        { id: '3', title: 'Three', available: true, preOrder: false },
      ], 
      categories: [{ id: '1', title: 'One' }], 
      currency: {
        USD: 8.0
      },
    }))).toEqual({
      items: [
        { id: '3', title: 'Three', available: true, preOrder: false },
        { id: '1', title: 'One', available: false, preOrder: true },
        { id: '2', title: 'Two', available: false, preOrder: false },
      ],
      categories: [{ id: '1', title: 'One' }],
      isLoading: false,
      searchQuery: '',
      currency: {
        USD: 8.0
      },  
    })
  });

  it('should handle setSearchQuery', () => {
    expect(reducer(initialState, setSearchQuery('il10'))).toEqual({
      items: undefined,
      categories: [],
      isLoading: true,
      searchQuery: 'il10',
      currency: {
        USD: 0
      },
    })
  });

  it('should handle setCurrency', () => {
    expect(reducer(initialState, setCurrency({USD: 8.0}))).toEqual({
      items: undefined,
      categories: [],
      isLoading: true,
      searchQuery: '',
      currency: {
        USD: 8.0
      },
    })
  });

  it('should fetchProducts', () => {
    mock.onGet(`${API_URL}/products`).reply(200, {
      success: true,
      data: [
        { _id: '1', title: 'One', available: false, preOrder: true },
      ], 
      categories: [{ _id: '1', title: 'One' }], 
      currency: {
        USD: 8.0
      },
    });

    store.dispatch(fetchProducts()).then(() => {
      const data = {
        products: [
          { _id: '1', id: '1', title: 'One', available: false, preOrder: true },
        ], 
        categories: [{ _id: '1', title: 'One' }], 
        currency: {
          USD: 8.0
        },
      }
      let expectedActions = [setProducts(data)]
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

});
