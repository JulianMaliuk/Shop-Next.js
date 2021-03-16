import { withRouter } from 'next/router';
import React, {Component} from 'react'
import { Grid, Card, Loader } from 'semantic-ui-react'
import CardContainer from '../Card'

class ProductList extends Component {

  render() {
    const { isLoading, products, currentURL, host } = this.props

    return (
      <Grid className="wrapper-product">
        <Grid.Column>
          {isLoading && !products.length ? (
            <Loader active inline="centered" content="Загрузка..." />
          ) : (
            <Card.Group itemsPerRow={4}>
              {products && products.map((productProps) => (
                <CardContainer
                  item={{...productProps}}
                  key={productProps.id}
                />
              ))}
              {products 
                && <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                  "@context": "http://schema.org",
                  "@graph": products.map((product) => (
                    {
                      "@context": "http://schema.org/",
                      "@type": "Product",
                      "brand": {
                        "@type": "Brand",
                        "name": "MagnuM"
                      },
                      "image": `${host}${product.img}`,  
                      "name": `${product.title}`,
                      "description": product.title + ' | ' + product.category.title,
                      "offers": {
                        "@type": "Offer",
                        "url": product.url ? `${currentURL}/${product.category.key}/${product.url}` : `${currentURL}`,
                        "availability": `http://schema.org/${ (product.available || product.preOrder) ? 'InStock' : 'OutOfStock'}`,
                        "priceCurrency": "UAH",
                        "price": Math.round(product.priceUAH * (1-product.discount))
                      }
                    }
                ))})}}
              />
              }
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

export default withRouter(ProductList)
