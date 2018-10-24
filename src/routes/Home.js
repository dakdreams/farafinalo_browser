import React from 'react';
import { Grid, Container, Tab, Header, List, Image, Responsive, Loader, Dropdown, Segment } from 'semantic-ui-react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { graphql, compose, Query } from 'react-apollo';

import BigMenu from '../responsive/menu';
import Product from '../components/homeProduct';
import HomeLogin from '../components/homeLogin';
import MobileHomeProduct from '../components/MobileHomeProduct';
import { meQuery, allProductQuery } from '../graphql/queries';

const SampleNextArrow = props => {
  const { className, style, onClick } = props;
  return (
    // eslint-disable-next-line
    <div className={className} style={{ ...style, display: 'block', background: '#c6b6b6' }} onClick={onClick} />
  );
};

const SamplePrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    // eslint-disable-next-line
    <div className={className} style={{ ...style, display: 'block', background: '#c6b6b6' }} onClick={onClick} />
  );
};

const Divrap = styled.div``;

const panes = [
  {
    menuItem: { key: 'farafinalo', icon: 'users', content: 'Farafinalo' },
    render: () => (
      <Tab.Pane>
        <Image
          alt="farafinalo"
          style={{ width: '100%', height: '16em' }}
          src="http://www.arts-ethniques.com/images/Image/niankoye-lama-artiste-africain-peinture-africaine-19.jpg"
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'ameublement', icon: 'plus cart', content: 'ameublement' },
    render: () => (
      <Tab.Pane>
        {' '}
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h4>Maison</h4>
              <List>
                <List.Item as="a">fauteille</List.Item>
                <List.Item as="a">table</List.Item>
                <List.Item as="a">table a manger</List.Item>
                <List.Item as="a">chiase</List.Item>
                <List.Item as="a">placar</List.Item>
                <List.Item as="a">Pour Enfant</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>bureau</h4>
              <List>
                <List.Item as="a">fauteille</List.Item>
                <List.Item as="a">table</List.Item>
                <List.Item as="a">chiese</List.Item>
                <List.Item as="a">placar</List.Item>
                <List.Item as="a">lit</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>decoration</h4>
              <List>
                <List.Item as="a">tableau</List.Item>
                <List.Item as="a">pot de fleur</List.Item>
                <List.Item as="a">instrument de nusique</List.Item>
                <List.Item as="a">porcelaine</List.Item>
                <List.Item as="a">autre</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://cdn.maisonsdumonde.com/img/meuble-tv-vintage-2-portes-1-tiroir-700-14-37-155632_2.jpg" size="small" wrapped />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'vestimentaire1', icon: 'male', content: 'Mode Home' },
    render: () => <Tab.Pane>habille</Tab.Pane>,
  },
  {
    menuItem: { key: 'vestimentaire2', icon: 'male', content: 'Mode femme' },
    render: () => <Tab.Pane>habille</Tab.Pane>,
  },
  {
    menuItem: { key: 'vestimentaire3', icon: 'male', content: 'Chaussures et Sacs' },
    render: () => <Tab.Pane>habille</Tab.Pane>,
  },
  {
    menuItem: { key: 'insolit', icon: 'male', content: 'Object insolite' },
    render: () => <Tab.Pane>habille</Tab.Pane>,
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { me = [] } = this.props.meQuery;
    const { firstname, avatar } = me;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      autoplay: true,
      centerMode: true,
      autoplaySpeed: 2000,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    const settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const trigger1 = (
      <span>
        <img width="53" height="53" alt="" src={'https://www.rachatdom.fr/wp-content/uploads/2017/12/icone-mobilier.png'} />
      </span>
    );

    const trigger2 = (
      <span>
        <img width="53" height="53" alt="" src={'https://image.flaticon.com/icons/svg/305/305114.svg'} />
      </span>
    );

    const trigger3 = (
      <span>
        <img width="53" height="53" alt="" src={'https://www.affichez.ca/wp-content/uploads/2014/01/icone_vetement-promo.png'} />
      </span>
    );

    const AllPros = () => (
      <Query query={allProductQuery}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <Responsive {...Responsive.onlyMobile}>
                <Grid divided="vertically" block="true">
                  <Grid.Row columns={2}>
                    {data.allProduct.products.map(prod => (
                      <Grid.Column key={prod.id}>
                        <MobileHomeProduct
                          key={prod.id}
                          prodName={prod.prodname}
                          proDescription={prod.prodescription}
                          imagelink={prod.prodimages[0]}
                          prodPrice={prod.prodprice}
                          prodId={prod.id}
                          owner={false}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Responsive>
              <Responsive {...Responsive.onlyComputer}>
                <Grid divided="vertically">
                  <Grid.Row columns={4}>
                    {data.allProduct.products.map(prod => (
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
              </Responsive>
            </div>
          );
        }}
      </Query>
    );

    const ComputerHome = () => (
      <Divrap>
        <Grid style={{ marginTop: 40 }}>
          <Grid.Row centered columns={2}>
            <Grid.Column tablet={15} computer={13}>
              {/* <Header as="h3" inverted color="blue" block="true">
                Info Farafina
              </Header> */}
              <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
            </Grid.Column>
          </Grid.Row>

          {/* <Grid.Row centered columns={2}>
            <Grid.Column width={13}>
              <Segment>
                <h1>top des produit </h1>
              </Segment>
            </Grid.Column>
          </Grid.Row> */}

          <Grid.Row centered columns={2}>
            <Grid.Column tablet={15} computer={10}>
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block="true">
                Produit Selectioner
              </Header>
              <Slider {...settings} style={{ backgroundColor: '#eeeeee' }}>
                <div>
                  <img
                    width="320"
                    height="250"
                    alt=""
                    src={'https://cdn.shopify.com/s/files/1/1510/7986/files/slider_espace_meuble_1920x.jpg?vu003d1515531332'}
                  />
                </div>
                <div>
                  <img
                    width="320"
                    height="250"
                    alt=""
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw54GuRmB3WXWk3VoUWnnpI5YWTX01atDQn9CqS4tr4fEROcz2jA'}
                  />
                </div>
                <div>
                  <img
                    width="320"
                    height="250"
                    alt=""
                    src={
                      'http://img-3.journaldesfemmes.com/_oa4sFK7VEqZygXyZLYJ2JqqWMg=/910x607/smart/e5c4b48f69654b829712a222a8762b86/ccmcms-jdf/10442563-renover-et-relooker-un-meuble-en-bois-sans-se-tromper.jpg'
                    }
                  />
                </div>
                <div>
                  <img
                    width="320"
                    height="250"
                    alt=""
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSng4nxD06UqL8MHSlM7Sv263W4VAx7B3OlnX4icpB9STSGjx40xw'}
                  />
                </div>
                <div>
                  <img width="320" height="250" alt="" src={'https://cdnm.westwing.com/glossary/uploads/fr/2015/06/chaise-africaine.jpg'} />
                </div>
              </Slider>
            </Grid.Column>

            <Grid.Column textAlign="center" floated="right" tablet={0} computer={3}>
              <Responsive {...Responsive.onlyComputer}>
                <HomeLogin firstname={firstname} avatar={avatar} />
              </Responsive>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={2}>
            <Grid.Column tablet={15} computer={13}>
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block="true">
                Top Des Vente
              </Header>

              <AllPros />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Divrap>
    );

    const MobileWraper = styled.div`
      position: relative;
      top: 1.5em;
      width: 100%;
      border: none;
    `;

    const MobileHome = () => (
      <MobileWraper>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Slider {...settings2}>
                <div key="1">
                  <img
                    width="100%"
                    height="140px"
                    alt=""
                    src={'https://cdn.shopify.com/s/files/1/1510/7986/files/slider_espace_meuble_1920x.jpg?vu003d1515531332'}
                  />
                </div>
                <div key="2">
                  <img
                    width="100%"
                    height="140px"
                    alt=""
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw54GuRmB3WXWk3VoUWnnpI5YWTX01atDQn9CqS4tr4fEROcz2jA'}
                  />
                </div>
              </Slider>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="equal">
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger1} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="Filter by tag" />
                  <Dropdown.Divider />
                  <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text="lit" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="camape" />
                  <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text="decoration" />
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Mobilier
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger3} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="femme" />
                  <Dropdown.Divider />
                  <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text="Chaussure" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Vestimantaire" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Sacs" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Accessoire" />
                  <Dropdown.Divider />
                  <Dropdown.Header icon="tags" content="homme" />
                  <Dropdown.Divider />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Chaussure" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Vestimantaire" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="Accessoire" />
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Mode
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger2} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="Filter by tag" />
                  <Dropdown.Divider />
                  <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text="materiels" />
                  <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text="logiciels" />
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Technologies
            </Grid.Column>
            <Grid.Column textAlign="center">
              <img
                width="53"
                height="53"
                alt=""
                src={
                  'data:image/png;base64,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'
                }
              />
              <br />
              Autre
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block="true">
                top des selection
              </Header>
            </Grid.Column>
          </Grid.Row>

          <AllPros />
        </Grid>
      </MobileWraper>
    );

    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <Container>
              <BigMenu />
              <MobileHome />
            </Container>
          </div>
        </Responsive>

        {/* <Responsive {...Responsive.onlyTablet}>salut</Responsive> */}
        <Responsive minWidth={768}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <BigMenu />

            <ComputerHome />
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default compose(
  graphql(meQuery, { name: 'meQuery' }),
  graphql(allProductQuery, { name: 'allProductQuery' })
)(Home);
