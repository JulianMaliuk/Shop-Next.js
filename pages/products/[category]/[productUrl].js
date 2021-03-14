import React, { useEffect, useState } from 'react'
import { Segment, Grid, Header, Icon, Dimmer, Loader, Breadcrumb, Label, Table, List } from 'semantic-ui-react'
import axios from 'axios'
import ImageGallery from 'react-image-gallery';
import Head from 'next/head'
import {useRouter, withRouter} from 'next/router';
import Link from 'next/link'

import { PageTemplate } from '../../../components'
import AddToCart from '../../../components/AddToCart'
import getLabel from '../../../helpers/getLabel'
import {API_HOST, API_URL} from "../../../constants";

import "react-image-gallery/styles/css/image-gallery.css";

const ProductPage = (props) => {
  const { host, productUrl, product, label, images, isLoading } = props
  const router = useRouter()
  const currentURL = host + router.asPath

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    isLoading 
    ? <PageTemplate>
        <Segment style={{ padding: '50px' }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
      </Segment>
    </PageTemplate>
    : product
      ? <PageTemplate>
          <Segment> 
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={`${product.description}. ${product.page.descr}`} />
                <meta property="og:type" content="product.item" />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={`${product.description}. ${product.page.descr}`} />
                <meta property="og:site_name" content="Shop Magnum" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image" content={`${host}${product.img}`} />
                <meta property="og:image:secure_url" content={`${host}${product.img}`} />
                <meta property="og:url" content={currentURL} />
                <meta property="og:locale" content="uk_UA" />
            </Head>
            {/* <Icon size='large' name='arrow left' link style={{marginRight: '12px', color: '#045490'}} onClick={this.props.history.goBack} /> */}
            <Breadcrumb>
              <Link href={`/products/all`}><a><Breadcrumb.Section content='Продукція' /></a></Link>
              <Breadcrumb.Divider icon='right angle' />
              <Link href={`/products/${product.category.key}`}><a><Breadcrumb.Section content={product.category.title} /></a></Link>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active content={product.title}>
              </Breadcrumb.Section>
            </Breadcrumb>
            <Segment color='red'>
              <Header as='h3'>{product.title} {label && <Label as='a' {...label} />}</Header>
            </Segment>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={8}>
                  <ImageGallery 
                    lazyLoad={true}
                    showThumbnails={false}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    showBullets={true}
                    items={images} />
                  {/* <Image src={product.img} alt={product.title} label={product.label ? { as: 'a', ribbon: 'right', ...getLabel(product.label, product.discount) } : null} /> */}
                </Grid.Column>
                <Grid.Column width={8}>
                  <p style={{whiteSpace: 'pre-line'}}>{product.page.descr}</p> <br />
                  <Grid padded verticalAlign='middle' textAlign='right' stackable>
                    <Grid.Row>
                      <Grid.Column width='8'>
                        {product.discount ? (<p><Label as='a' color='black' size='small' tag><s>{Math.round(product.priceUAH)}</s> грн</Label></p>) : ''}
                        Ціна&nbsp;<Label as='a' color='orange' size='medium' tag>{Math.round((product.priceUAH * (1-product.discount)))} грн</Label>
                      </Grid.Column>
                      <Grid.Column width='8'>
                        <AddToCart product={product} fluid={true} />
                      </Grid.Column>
                    </Grid.Row>
                    {product.refUrl && <Grid.Row>
                      <Grid.Column width='16'>
                        <a href={product.refUrl} target='_blank' rel="noopener noreferrer">Товар на сайті виробника</a>
                      </Grid.Column>
                    </Grid.Row>}
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              {product.page.feautures && product.page.feautures.length > 0 ? 
                <Grid.Row>
                  <Grid.Column textAlign='center' id='colunm-feautures'>
                  <Segment color='teal' textAlign='center'>
                    <Header as='h3' textAlign='center'>
                      <Icon name='chart bar' />
                      <Header.Content>Характеристики</Header.Content>
                    </Header>

                    <Table basic='very' celled selectable>
                      <Table.Body>
                        {product.page.feautures.map(feauture => (
                          <Table.Row key={feauture.key}>
                            <Table.Cell>
                              <Header as='h4' content={feauture.key} />
                            </Table.Cell>
                            <Table.Cell>{feauture.value}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Segment>
                  </Grid.Column>
                </Grid.Row>
              : ''}
              {product.page.functions && product.page.functions.length > 0 ?
                <Grid.Row>
                  <Grid.Column textAlign='center' id='colunm-functions'>
                  <Segment color='teal' textAlign='center'>
                    <Header as='h3' textAlign='center'>
                      <Icon name='chart bar' />
                      <Header.Content>Функції</Header.Content>
                    </Header>

                    {product.page.functions.map(func => (
                      <Segment key={func.group}>
                        <List divided relaxed>
                          <Header as='h5'>
                            <Header.Content>{func.group}</Header.Content>
                          </Header>
                          {func.list.map((item, i) => (
                            <List.Item key={i + item}>
                              <List.Content>
                                <List.Description>- {item}</List.Description>
                              </List.Content>
                            </List.Item>
                          ))}
                        </List>
                      </Segment>
                    ))}
                  </Segment>
                  </Grid.Column>
                </Grid.Row>
              : ''}
            </Grid>
            <style jsx global>{`
              @media (max-width: 768px) {
                #colunm-functions, #colunm-feautures {
                  padding: 1rem 0rem !important;
                }
              }
            `}</style>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "http://schema.org/",
                "@type": "Product",
                "brand": {
                  "@type": "Brand",
                  "name": "MagnuM"
                },
                "image": `${host}${product.img}`,  
                "name": `${product.title} | ${product.category.title}`,
                "description": `${product.description}. ${product.page.descr}`,
                "offers": {
                  "@type": "Offer",
                  "url": currentURL,
                  "availability": `http://schema.org/${ (product.available || product.preOrder) ? 'InStock' : 'OutOfStock'}`,
                  "priceCurrency": "UAH",
                  "price": Math.round(product.priceUAH * (1-product.discount))
                }
              }) }}
            />
          </Segment>
        </PageTemplate>
        
      : <Segment>Халепа(</Segment>
  )
}

export default ProductPage

export async function getServerSideProps({ req, query }) {
  const { productUrl } = query;
  const host = req ? req.headers.host : location.hostname;

  const response = await axios(`${API_HOST}${API_URL}/products/u/${productUrl}`)
  const { data: { data: product } } = response
  let images = [{ 
      original: product.img, 
      originalAlt: product.title 
    }]
  if(product.page && product.page.images && product.page.images.length) {
    product.page.images.forEach(image => {
      images.push({ 
        original: image, 
        originalAlt: product.title 
      },)
    })
  }
  const description = [];
  if(product?.page?.feautures) {
    product.page.feautures.forEach(p => {
      const {key, value} = p;
      if(value === '+') description.push(key)
      if(value === 'опція') description.push(`${key} (опція)`)
    })
  }

  return {
    props: {
      host,
      productUrl,
      product: { ...product, id: product._id, description: description.join(', ') },
      label: getLabel(product.label, product.discount),
      images: images,
      isLoading: false,
    },
  }
}
