import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Grid, Container, Segment, Responsive, Header, Loader, Dimmer } from 'semantic-ui-react';

import BigMenu from '../responsive/menu';
import Product from '../components/homeProduct';
import MobileHomeProduct from '../components/MobileHomeProduct';
import { cathegoryAllProductQuery } from '../graphql/queries';

const DivWrapMobile = styled.div`
  position: relative;
  top: 2.5em;
  width: 100%;
  border: none;
`;

class Cathegory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.auth();
  }

  auth = async () => {};
  render() {
    const cathegory = this.props.match.params.cat;
    const myCat = [
      'meuble',
      'lits',
      'canapes',
      'tables-manger',
      'bureaux',
      'decoration',
      'armoires',
      'meuble-enfant',
      'autre-ameublement',
      'vestimentaire',
      'chaussure-femme',
      'vestimantaire-femme',
      'sacs',
      'accessoire-femme',
      'chaussure-homme',
      'vestimantaire-homme',
      'accessoire-homme',
      'materiels',
      'logiciel',
      'autre',
    ];

    if (!myCat.includes(cathegory)) {
      this.props.history.push('/');
    }

    const ComputerProduct = () => (
      <Query query={cathegoryAllProductQuery} variables={{ cathegory }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Grid style={{ marginTop: '10em' }}>
                <Dimmer active inverted>
                  <Loader size="medium">Loading</Loader>
                </Dimmer>
              </Grid>
            );
          }
          if (error) return `Error! ${error.message}`;

          const { products } = data.cathegoryAllProduct;
          if (products) {
            return (
              <Grid style={{ marginTop: '8em' }}>
                <Header as="h3" size='huge' inverted color="red" icon textAlign='center' block>
                  !!!desoles pas de <a style={{ fontSize: 'large', fontFamily: 'cursive', color: 'white' }}>{cathegory}</a> pour le moment!!!
                </Header>
              </Grid>
            );
          }
          return (
            <div style={{ marginTop: '5em' }}>
              <Grid.Column>
                <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
                  Top Des Vente {cathegory}
                </Header>
                <Grid divided="vertically">
                  <Grid.Row columns={4}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {products.map(prod => (
                      <Grid.Column key={prod.id}>
                        <Product
                          key={prod.id}
                          prodName={prod.prodname}
                          proDescription={prod.prodescription}
                          imagelink={prod.prodimages[0]}
                          prodPrice={prod.prodprice}
                          prodId={prod.id}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </div>
          );
        }}
      </Query>
    );

    const MobileProduct = () => (
      <Query query={cathegoryAllProductQuery} variables={{ cathegory }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader style={{ marginTop: '12em', marginLeft: 165 }} active inline="centered" />;
          }
          if (error) return `Error! ${error.message}`;

          const { products } = data.cathegoryAllProduct;
          if (products) {
            return (
              <Grid>
                <Header as="h3" inverted color="red" block>
                  !!desoles pas de <a style={{ fontSize: '25px', fontFamily: 'cursive', color: 'white' }}>{cathegory}</a> pour le moment!!!
                </Header>
              </Grid>
            );
          }
          return (
            <Grid>
              <Header as="h3" size="huge" style={{ backgroundColor: '#f8453e', color: 'white' }} block="true">
                Selection {cathegory}
              </Header>

              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                  {products.map(prod => (
                    <Grid.Column key={prod.id}>
                      <MobileHomeProduct
                        key={prod.id}
                        prodName={prod.prodname}
                        proDescription={prod.prodescription}
                        imagelink={prod.prodimages[0]}
                        prodPrice={prod.prodprice}
                        prodId={prod.id}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );

    const MobileCathegory = () => (
      <DivWrapMobile>
        <MobileProduct />
      </DivWrapMobile>
    );

    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <Container style={{ backgroundColor: '#fcfcfc', width: 'auto', height: 'auto', position: 'absolute' }}>
            <BigMenu />
            <MobileCathegory />
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>salut</Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <BigMenu />
            <Container>
              <ComputerProduct />
            </Container>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default Cathegory;
