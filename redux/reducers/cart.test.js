import reducer, {initialState, addToCart, cleanCart, removeFromCart, setCount, updateCartByID} from './cart'

let state;

beforeEach(() => {
  state = {
    items: [
      { 'id': '601308972d04b678a3cbd8e0', 'count': 1 },
      { 'id': '78a3cbd8e0601308972d04b6', 'count': 1 },
      { 'id': 'd04b678a3cbd8e0601308972', 'count': 1 },
    ]
  };
})

afterEach(() => state = null)

describe('cart reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: []
    })
  })

  it('should handle addToCart', () => {
    expect(
      reducer(state, 
        addToCart({
          'id': 'eb1101e6e7365g11ebe9439z'
        })
      )
    ).toEqual({
      items: [
        { 'id': '601308972d04b678a3cbd8e0', 'count': 1 },
        { 'id': '78a3cbd8e0601308972d04b6', 'count': 1 },
        { 'id': 'd04b678a3cbd8e0601308972', 'count': 1 },
        { 'id': 'eb1101e6e7365g11ebe9439z', 'count': 1 },
      ]
    })
  })

  it('should handle removeFromCart', () => {
    expect(
      reducer(state, 
        removeFromCart('78a3cbd8e0601308972d04b6')
      )
    ).toEqual({
      items: [
        { 'id': '601308972d04b678a3cbd8e0', 'count': 1 },
        { 'id': 'd04b678a3cbd8e0601308972', 'count': 1 },
      ]
    })
  })

  it('shoud handle cleanCart', () => {
    expect(reducer(state, cleanCart())).toEqual(initialState)
  });

  it('should handle setCount', () => {
    expect(
      reducer(state, setCount({id: '78a3cbd8e0601308972d04b6', count: 3}))
    ).toEqual({
        items: [
          { 'id': '601308972d04b678a3cbd8e0', 'count': 1 },
          { 'id': '78a3cbd8e0601308972d04b6', 'count': 3 },
          { 'id': 'd04b678a3cbd8e0601308972', 'count': 1 },
        ]
      })
  });

  it('should handle updateCartByID', () => {
    expect(
      reducer(state, updateCartByID({ id: '78a3cbd8e0601308972d04b6', product: {name: 'item'} }))
    ).toEqual({
        items: [
          { 'id': '601308972d04b678a3cbd8e0', 'count': 1 },
          { 'id': '78a3cbd8e0601308972d04b6', 'count': 1, name: 'item' },
          { 'id': 'd04b678a3cbd8e0601308972', 'count': 1 },
        ]
      })
  });
})
