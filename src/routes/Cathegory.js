import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Grid, Container, Segment, Responsive, Header, Loader, Dimmer, Pagination } from 'semantic-ui-react';

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
    this.state = {
      activePage: 1,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: false,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      limito: 2,
      offsetCount: 0,
      // totalPages: 10,
    };
  }

  componentDidMount() {
    this.auth();
  }

  handlePaginationChange = (e, { activePage }) => {
    // determne offset
    // const offsetCount =
    // selct data of the page activate
    this.setState({ activePage });
  };

  auth = async () => {};
  render() {
    const { activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav } = this.state;
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
      <Query query={cathegoryAllProductQuery} variables={{ cathegory, offset: this.state.offsetCount, limit: this.state.limito }}>
        {({ loading, error, data, refetch }) => {
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

          const { products, productCount } = data.cathegoryAllProduct;
          const returnTotalPage = Math.round(productCount / 2);
          const handlePaginationChange1 = (e, { activePage }) => {
            // determne offset
            const offsetCount2 = activePage - 1;
            // selct data of the page activate
            this.setState({ activePage, limito: 2, offsetCount: offsetCount2 });
            refetch();
          };
          if (products) {
            return (
              <Grid style={{ marginTop: '8em' }}>
                <Header as="h3" size="huge" inverted color="red" icon textAlign="center" block>
                  !!!desoles pas de <a style={{ fontSize: 'large', fontFamily: 'cursive', color: 'white' }}>{cathegory}</a> pour le moment!!!
                </Header>
              </Grid>
            );
          }
          return (
            <Grid divided="vertically" centered columns={5} style={{ marginTop: '1em' }}>
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
              <Grid.Row centered>
                {returnTotalPage > 1 ? (
                  <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    onPageChange={handlePaginationChange1}
                    size="mini"
                    siblingRange={siblingRange}
                    totalPages={returnTotalPage}
                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                    ellipsisItem={showEllipsis ? undefined : null}
                    firstItem={showFirstAndLastNav ? undefined : null}
                    lastItem={showFirstAndLastNav ? undefined : null}
                    prevItem={showPreviousAndNextNav ? undefined : null}
                    nextItem={showPreviousAndNextNav ? undefined : null}
                  />
                ) : (
                  'cathegirie end'
                )}
              </Grid.Row>
            </Grid>
          );
        }}
      </Query>
    );

    const ComputerProductView = () => (
      <Grid style={{ marginTop: 40 }}>
        <Grid.Row centered tablet={15} computer={13}>
          <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
            Selection de {cathegory}
          </Header>
        </Grid.Row>
        <Grid.Row centered tablet={15} computer={16}>
          <ComputerProduct />
        </Grid.Row>
        {/* <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
            Top Des Vente {cathegory}
          </Header>
          <ComputerProduct /> */}
      </Grid>
    );

    const MobileProduct = () => (
      <Query query={cathegoryAllProductQuery} variables={{ cathegory, offset: this.state.offsetCount, limit: this.state.limito }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <Loader style={{ marginTop: '12em', marginLeft: 165 }} active inline="centered" />;
          }
          if (error) return `Error! ${error.message}`;

          const { products, productCount } = data.cathegoryAllProduct;
          const returnTotalPage = Math.round(productCount / 2);
          const handlePaginationChange1 = async (e, { activePage }) => {
            // determne offset
            const offsetCount2 = activePage - 1;
            // selct data of the page activate
            await this.setState({ activePage, limito: 2, offsetCount: offsetCount2 });
            refetch();
          };
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
              <Grid.Row centered>
                {returnTotalPage > 1 ? (
                  <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    onPageChange={handlePaginationChange1}
                    size="mini"
                    siblingRange={siblingRange}
                    totalPages={returnTotalPage}
                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                    ellipsisItem={showEllipsis ? undefined : null}
                    firstItem={showFirstAndLastNav ? undefined : null}
                    lastItem={showFirstAndLastNav ? undefined : null}
                    prevItem={showPreviousAndNextNav ? undefined : null}
                    nextItem={showPreviousAndNextNav ? undefined : null}
                  />
                ) : (
                  'cathegorie end '
                )}
              </Grid.Row>
            </Grid>
          );
        }}
      </Query>
    );

    const MobileCathegory = () => (
      <DivWrapMobile>
        <Header as="h3" size="huge" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
          Selection {cathegory}
        </Header>
        <MobileProduct />
      </DivWrapMobile>
    );

    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <Container>
            <BigMenu />
            <MobileCathegory />
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>salut</Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <BigMenu />
            <ComputerProductView />
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default Cathegory;
