import React, {  } from 'react';
import {
  Card,
  Grid,
  Image,
  Button,
  Label,
} from 'semantic-ui-react';
import { LazyImage } from "react-lazy-images";
import Link from 'next/link'
import getLabel from '../../helpers/getLabel'
import { SITE_URL } from '../../constants'

export default function ProductCard(props) {
  const { id, img, title, priceUAH, available, preOrder, discount, label, url, category, key_features = [] } = props.item
  const { isInCart, addToCart, cart, setIsOpenCart } = props
  const inCart = isInCart(cart, id);
  const priceWithDiscount = Math.round((priceUAH * (1-discount)));
  const _label = getLabel(label, discount);

  return (
    <Card>
      <LazyImage
          src={SITE_URL + img}
          alt={title}
          label={_label ? { as: 'a', ribbon: 'right', ..._label } : null}
          placeholder={({ imageProps, ref }) => (
              <img ref={ref} src={`${SITE_URL}/images/product-placeholder.jpg`} alt={imageProps.alt} />
          )}
          actual={({ imageProps }) => <Image {...imageProps} />}
      />
      <Card.Content>
        <Card.Header content={title} />
        <Card.Description>
          {
            key_features.map(feature => (
              <Label key={feature} size='small' style={{marginBottom: '2px'}} color={(feature === 'Безключовий обхідник' || feature === 'CAN') ? 'grey': null}>{feature}</Label>
            ))
          }
        </Card.Description>
        <Card.Meta style={{paddingTop:'15px'}} textAlign={'right'}>
          {discount ? (<p><Label as='a' color='black' size='small' tag><s>{priceUAH}</s> грн</Label></p>) : ''}
          Ціна &nbsp; <Label as='a' color='orange' size='medium' tag>{priceWithDiscount} грн</Label></Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Grid stretched doubling>
          <Grid.Row columns='equal'>
            <Grid.Column>
              {available ? <Button
                content={inCart ? 'Вже у кошику' : 'Придбати'}
                color={inCart ? 'grey' : 'green'}
                fluid
                onClick={!inCart ? () => addToCart(props.item) : () => setIsOpenCart(true)}
              /> : preOrder 
                    ? <Button
                      content={inCart ? 'Вже у кошику' : 'Попереднє замовлення'}
                      color={inCart ? 'grey' : 'red'}
                      fluid
                      onClick={!inCart ? () => addToCart(props.item) : () => setIsOpenCart(true)} />
                    : <Button disabled>Немає в наявності</Button>}
              {url && <Link href={`/products/${category.key}/${url}`}><a><Button basic fluid color='blue' style={{marginTop: '10px'}}>Деталі</Button></a></Link>}
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
            <Grid.Column stretched>
              {available ? <Button
                content={inCart ? 'Вже у кошику' : 'Придбати'}
                color={inCart ? 'grey' : 'green'}
                onClick={!inCart ? addToCart.bind(this, props.item) : ()=>{}}
              /> : <Button disabled>Немає в наявності</Button>}
            </Grid.Column>
          </Grid.Row>
          { refUrl && <Grid.Row>
              <Grid.Column stretched>
                <ShowModalRef Btn={<Button content='Деталі' color='olive' />} header={title} refUrl={refUrl} />
              </Grid.Column>
          </Grid.Row>} */}
        </Grid>
      </Card.Content>
      <Card.Content extra>
        {available
          ? <Card.Description style={{color: 'green'}}>В наявності </Card.Description>
          : <Card.Description style={{color: 'grey'}}>Немає в наявності </Card.Description>}
      </Card.Content>
    </Card>
  )
}

// class ShowModalRef extends Component {
  
//   state = { isLoaded: false }

//   handleChangeState = (name, value) => {
//     this.setState({ [name]: value })
//   }

//   render() {
//     const { node, header, refUrl } = this.props
//     const { isLoaded } = this.state
//     return (
//       <Modal trigger={node} closeIcon>
//         <Modal.Header>{ header }</Modal.Header>
//         <Modal.Content >
//           <Dimmer active={!isLoaded} inverted>
//             <Loader inline="centered" content="Загрузка..." />
//           </Dimmer>
//           <iframe title={refUrl} src={refUrl} frameBorder='0' style={{ overflow: 'hidden', height: '81vh', width: '100%' }} width='100%' height='100%' onLoad={this.handleChangeState.bind(this, 'isLoaded', true)} ></iframe>
//         </Modal.Content>
//       </Modal>
//     )
//   }
// }
