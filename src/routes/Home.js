import React from 'react';
import { Grid, Container, Tab, Header, List, Image, Responsive, Loader, Dropdown, Segment } from 'semantic-ui-react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { graphql, compose, Query } from 'react-apollo';
import { Link } from 'react-router-dom';

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
    menuItem: { key: 'farafinalo', content: 'Farafinalo' },
    render: () => (
      <Tab.Pane>
        <Image
          alt="farafinalo"
          style={{ width: '100%', height: '15em' }}
          src="https://thumbs.dreamstime.com/t/fond-avec-le-paysage-de-l-afrique-du-sud-illustration-vecteur-123563851.jpg"
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'ameublement', icon: 'home', color: 'green', content: 'ameublement' },
    render: () => (
      <Tab.Pane>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h4>Maison</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/lits">Lits</Link>
                </List.Item>
                <List.Item>
                  <Link to="/product/cathegory/canapes">Canapes</Link>
                </List.Item>
                <List.Item>
                  <Link to="/product/cathegory/armoires">Armoires</Link>
                </List.Item>
                <List.Item>
                  <Link to="/product/cathegory/tables-manger">Tables a Manger</Link>
                </List.Item>
                <List.Item>
                  <Link to="/product/cathegory/meuble-enfant">meuble enfant</Link>
                </List.Item>
                <List.Item>
                  <Link to="/product/cathegory/decoration">Deco</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>bureau</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/bureaux">Bureaux</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Autre ameublement</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/autre-ameublement">Autre</Link>
                </List.Item>
                {/* <List.Item as="a">pot de fleur</List.Item>
                <List.Item as="a">instrument de nusique</List.Item>
                <List.Item as="a">porcelaine</List.Item>
                <List.Item as="a">autre</List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://cdn.maisonsdumonde.com/img/meuble-tv-vintage-2-portes-1-tiroir-700-14-37-155632_2.jpg"
                alt="farafinalo"
                size="medium"
                wrapped
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'vestimentaire1', icon: 'male', color: 'violet', content: 'Mode Femme' },
    render: () => (
      <Tab.Pane>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h4>vestimantaire</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/vestimantaire-femme">Vestimantaire</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Chaussure</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/chaussure-femme">Chaussure</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Accessoire</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/accessoire-femme">Accessoire</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="data:image/jpeg;base64,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"
                size="medium"
                alt="farafinalo"
                wrapped
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'vestimentaire2', icon: 'black tie', color: 'blue', content: 'Mode Home' },
    render: () => (
      <Tab.Pane>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h4>Vestimantaire</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/vestimantaire-homme">Vestimantaire</Link>
                </List.Item>
                <List.Item as="a">Pour Enfant</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Chaussure</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/chaussure-homme">Chaussure</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Accessoire</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/accessoire-homme">Accessoire</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://static.vecteezy.com/system/resources/previews/000/148/628/non_2x/men-fashion-icon-pack-vector.jpg"
                size="medium"
                alt="farafinalo"
                wrapped
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'techno', icon: 'factory', color: 'yellow', content: 'Technologies' },
    render: () => (
      <Tab.Pane>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h4>Materiels</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/materiels">Materiels</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4>Logicils</h4>
              <List>
                <List.Item>
                  <Link to="/product/cathegory/logiciel" style={{ color: 'red' }}>
                    logiciel
                  </Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              {''}
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QU2l-uo4JukqUl6RJ1n8esSyvehLLz58rSWBMOpvI1Q1qNjwsw"
                size="medium"
                alt="farafinalo"
                wrapped
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'insolit', icon: 'in cart', color: 'teal', content: 'autre' },
    render: () => (
      <Tab.Pane>
        <Link to="/product/cathegory/autre" style={{ color: 'red' }}>
          Autre
        </Link>
      </Tab.Pane>
    ),
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
        <img width="53" height="53" alt="chair" src={'https://res.cloudinary.com/dg6zkrdqu/image/upload/v1540757763/farafinalo-icon/chair.svg'} />
      </span>
    );

    const trigger2 = (
      <span>
        <img width="53" height="53" alt="idea" src={'https://res.cloudinary.com/dg6zkrdqu/image/upload/v1540757764/farafinalo-icon/idea.png'} />
      </span>
    );

    const trigger3 = (
      <span>
        <img width="53" height="53" alt="mode" src={'https://res.cloudinary.com/dg6zkrdqu/image/upload/v1540757771/farafinalo-icon/mode.png'} />
      </span>
    );

    const trigger4 = (
      <span>
        <img
          width="53"
          height="53"
          alt="mode"
          src={'https://res.cloudinary.com/dg6zkrdqu/image/upload/v1540757767/farafinalo-icon/supermarket.svg'}
        />
      </span>
    );

    const AllPros = () => (
      <Query query={allProductQuery}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) {
            return (
              <div>
                <Responsive {...Responsive.onlyComputer}>
                  <Grid>
                    <Grid.Row centered>
                      <Image
                        alt="farafinalo"
                        style={{ width: '20em', height: '15em' }}
                        src="/baby.png"
                      />
                    </Grid.Row>
                    <Grid.Row centered>
                      <div> OOps! desole verifier votre connection internet</div>
                    </Grid.Row>
                  </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                  <Grid>
                    <Grid.Row centered>
                      <Image
                        alt="farafinalo"
                        style={{ width: '80%', height: '80%' }}
                        src="/baby.png"
                      />
                    </Grid.Row>
                    <Grid.Row centered>
                      <div> OOps! desole verifier votre connection internet</div>
                    </Grid.Row>
                  </Grid>
                </Responsive>
              </div>
            );
          }

          return (
            <div>
              <Responsive {...Responsive.onlyMobile}>
                <Grid divided="vertically">
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
                  {/* <Label basic color="red" pointing="below">
                    Please enter a value
                  </Label> */}
                </Grid>
              </Responsive>
              <Responsive minWidth={768}>
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
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
                Produit Selectioner
              </Header>
              <Slider {...settings} style={{ backgroundColor: '#eeeeee' }}>
                <div>
                  <img
                    width="300"
                    height="200"
                    alt="toto"
                    src={'https://cdn.shopify.com/s/files/1/1510/7986/files/slider_espace_meuble_1920x.jpg?vu003d1515531332'}
                  />
                </div>
                <div>
                  <img
                    width="300"
                    height="200"
                    alt="titi"
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw54GuRmB3WXWk3VoUWnnpI5YWTX01atDQn9CqS4tr4fEROcz2jA'}
                  />
                </div>
                <div>
                  <img
                    width="300"
                    height="200"
                    alt="toto"
                    src={
                      'https://img-3.journaldesfemmes.com/_oa4sFK7VEqZygXyZLYJ2JqqWMg=/910x607/smart/e5c4b48f69654b829712a222a8762b86/ccmcms-jdf/10442563-renover-et-relooker-un-meuble-en-bois-sans-se-tromper.jpg'
                    }
                  />
                </div>
                <div>
                  <img
                    width="300"
                    height="200"
                    alt="kirokou"
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSng4nxD06UqL8MHSlM7Sv263W4VAx7B3OlnX4icpB9STSGjx40xw'}
                  />
                </div>
                <div>
                  <img width="300" height="200" alt="" src={'https://cdnm.westwing.com/glossary/uploads/fr/2015/06/chaise-africaine.jpg'} />
                </div>
              </Slider>
            </Grid.Column>

            <Grid.Column textAlign="center" floated="right" computer={3}>
              <Responsive {...Responsive.onlyComputer}>
                <HomeLogin firstname={firstname} avatar={avatar} />
              </Responsive>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={2}>
            <Grid.Column tablet={15} computer={13}>
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
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
                    alt="fararinalo"
                    src={'https://cdn.shopify.com/s/files/1/1510/7986/files/slider_espace_meuble_1920x.jpg?vu003d1515531332'}
                  />
                </div>
                <div key="2">
                  <img
                    width="100%"
                    height="140px"
                    alt="farafinalo"
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
                  <Dropdown.Header icon="tags" content="Ameublement" />
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link to="/product/cathegory/lits">Lits</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/canapes">Canapes</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/armoires">Armoires</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/tables-manger">Tables a Manger</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/bureaux">Bureaux</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/decoration">Deco</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/meuble-enfant">meuble enfant</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/autre-ameublement">Autre</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Mobilier
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger3} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="Mode femme" />
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <Link to="/product/cathegory/vestimantaire-femme">Vestimantaire</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/chaussure-femme">Chaussure</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/sacs">Sacs</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/accessoire-femme">Accessoire</Link>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Header icon="tags" content="Mode homme" />
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <Link to="/product/cathegory/vestimantaire-homme">Vestimantaire</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/chaussure-homme">Chaussure</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/accessoire-homme">Accessoire</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Mode
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger2} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="africa tech" />
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link to="/product/cathegory/materiels">Materiels</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/product/cathegory/logiciel" style={{ color: 'red' }}>
                      logiciel
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Technologies
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Dropdown trigger={trigger4} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="autre" />
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link to="/product/cathegory/autre" style={{ color: 'red' }}>
                      Autre
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              Autre
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3" style={{ backgroundColor: '#f8453e', color: 'white' }} block>
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
