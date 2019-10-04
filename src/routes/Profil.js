import React from 'react';
import { graphql, compose, Query } from 'react-apollo';
import styled from 'styled-components';
import { Container, Image, Menu, Tab, Grid, Button, Icon, Popup, Segment, Responsive } from 'semantic-ui-react';
// import { Image as CloudImage } from 'cloudinary-react';

import Update from './Update';
import Products from '../components/product';
import MobileHomeProduct from '../components/MobileHomeProduct';

import BigMenu from '../responsive/menu';
import ProfilImage from '../responsive/layout/profil';
import Avatar from '../responsive/layout/avatar';
import About from '../responsive/layout/about';
// import config from '../config';
import { getUserAllProductQuery, meQuery, getFollowStoreQuery } from '../graphql/queries';
import Messages from '../components/Messages';
import StoreView from '../components/StoreView';

const TabletAvatar = styled.div`
  position: relative;
  height: 17em;
  width: 17em;
  top: -100px;
  left: 70px;
`;

const AddProduct = styled.div`
  position: fixed;
  z-index: 1;
  top: 90%;
  left: 94%;
  border-radius: 30px;
  background-color: #0d71bb;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const AddProductTablet = styled.div`
  position: absolute;
  z-index: 1;
  top: -6em;
  left: 40em;
  border-radius: 30px;
  background-color: #0d71bb;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const MobileAvatar = styled.div`
  position: relative;
  top: -25%;
  left: 8%;
`;

// const Wraper = styled.div`
//   // position: absolute;
//   // width: 100%;
//   // height: 100%;
//   // margin-top: 25px;
// `;

const ContentTab = styled.div`
  position: relative;
  top: -18em;
  left: 25em;
  width: 76.6%;
  height: auto;
`;

const ContentTabelTab = styled.div`
  position: relative;
  top: -11em;
  left: 2em;
  width: 100%;
  height: auto;
`;

const AboutWrap = styled.div`
  position: absolute;
  top: 32em;
  left: 16%;
  z-index: 0;
  width: 20em;
  border: none;
`;

// const BigWrap = styled.div`
// `;

class Profil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myProduct: '',
    };
  }

  componentDidMount() {
    this.auth();
  }
  auth = async () => {
    const { error } = await this.props.meQuery;
    if (error) {
      this.props.history.push('/login');
    }
    const value = [];
    const { getUserAllProduct = [] } = await this.props.getUserAllProductQuery;
    const { product } = getUserAllProduct;

    await value.push(product);
    await this.setState({ myProduct: value });
  };
  addProducts = () => {
    this.props.history.push('/addproduct');
  };

  render() {
    const { me = [] } = this.props.meQuery;
    const { firstname, secondname, business, about, avatar, profil, id, statu } = me;
    const { getUserAllProduct = [] } = this.props.getUserAllProductQuery;
    const { product = [] } = getUserAllProduct;

    const entreprise = [business].join(' ');

    const allname = `${firstname} ${secondname}`;

    const abouts = [about].join(' ');

    const FollowStoreView = () => (
      <Query query={getFollowStoreQuery}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const { result } = data.getFollowStore;
          if (result.length === 0) {
            return (
              <Container textAlign='center'>
                <p style={{ height: '20em', textAlign: 'center' }}>
                  vous ne posseder pas pour le moment de store!!
                </p>
              </Container>
            );
          }

          return (
            <div>
              <Responsive {...Responsive.onlyComputer}>
                <Grid divided="vertically" block="true">
                  <Grid.Row columns={3}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {result.map(store => (
                      <Grid.Column key={store.id}>
                        <StoreView
                          storeId={store.id}
                          storeName={store.storename}
                          storeFirstName={store.ownerfirstname}
                          storeSecondName={store.ownersecondname}
                          storeAvatar={store.storeavatar}
                          storeProfil={store.storeprofil}
                          storeAbout={store.storeabout}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Responsive>

              <Responsive {...Responsive.onlyMobile}>
                <Grid divided="vertically" block="true">
                  <Grid.Row columns={2}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {result.map(store => (
                      <Grid.Column key={store.id}>
                        <StoreView
                          storeId={store.id}
                          storeName={store.storename}
                          storeFirstName={store.ownerfirstname}
                          storeSecondName={store.ownersecondname}
                          storeAvatar={store.storeavatar}
                          storeProfil={store.storeprofil}
                          storeAbout={store.storeabout}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Responsive>
              <Responsive {...Responsive.onlyTablet}>
                <Grid divided="vertically" block="true">
                  <Grid.Row columns={3}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {result.map(store => (
                      <Grid.Column key={store.id}>
                        <StoreView
                          storeId={store.id}
                          storeName={store.storename}
                          storeFirstName={store.ownerfirstname}
                          storeSecondName={store.ownersecondname}
                          storeAvatar={store.storeavatar}
                          storeProfil={store.storeprofil}
                          storeAbout={store.storeabout}
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

    const ComputerView = () => (
      <ContentTab>
        {business ? (
          <Tab
            panes={[
              {
                menuItem: { key: 'articles', icon: 'shop', content: 'Mes produits' },
                render: () => (
                  <Tab.Pane active="false">
                    {product.length !== 0 ? (
                      <Grid divided="vertically">
                        <Grid.Row columns={3}>
                          {product.map(prod => (
                            <Grid.Column key={prod.id}>
                              <Products
                                key={prod.id}
                                prodName={prod.prodname}
                                proDescription={prod.prodescription}
                                imagelink={prod.prodimages[0]}
                                prodPrice={prod.prodprice}
                                prodId={prod.id}
                                prodcath={prod.prodcathegory}
                              />
                            </Grid.Column>
                          ))}
                        </Grid.Row>
                      </Grid>
                    ) : (
                      <div style={{ height: '20em', textAlign: 'center' }}>pas de produit pour le moment</div>
                    )}
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Statistique' },
                render: () => (
                  <Tab.Pane>
                    <div style={{ height: '20em', textAlign: 'center' }}> cette page est en developement</div>
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'users', icon: 'vcard', content: 'Mon profil' },
                render: () => (
                  <Tab.Pane>
                    <Update />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                render: () => (
                  <Tab.Pane>
                    <Messages prodowner={id} userAvatar={avatar} businessName={business} />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        ) : (
          <Tab
            panes={[
              {
                menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                render: () => (
                  <Tab.Pane>
                    <Messages prodowner={id} userAvatar={avatar} businessName={business} />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'users', icon: 'vcard', content: 'Mon profil' },
                render: () => (
                  <Tab.Pane>
                    <Update />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Statistique' },
                render: () => (
                  <Tab.Pane>
                    <div style={{ height: '20em', textAlign: 'center' }}> cette page est en developement</div>
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Store favories' },
                render: () => (
                  <Tab.Pane>
                    <FollowStoreView />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        )}

        {statu === 'vendeur' ? (
          <AddProduct>
            <Popup
              trigger={
                <Button onClick={this.addProducts} color="blue" circular animated>
                  <Button.Content visible>
                    <Icon name="plus" />
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="add to cart" />
                  </Button.Content>
                </Button>
              }
              content="ajouter un nouveau produit!!"
              on="hover"
            />
          </AddProduct>
        ) : (
          ''
        )}
      </ContentTab>
    );

    const TabletView = () => (
      <ContentTabelTab>
        {business ? (
          <Tab
            panes={[
              {
                menuItem: { key: 'articles', icon: 'shop', content: 'Mes produits' },
                render: () => (
                  <Tab.Pane>
                    {product.length !== 0 ? (
                      <Grid divided="vertically">
                        <Grid.Row columns={3}>
                          {product.map(prod => (
                            <Grid.Column key={prod.id}>
                              <Products
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
                    ) : (
                      <div style={{ height: '20em', textAlign: 'center' }}>pas de produit pour le moment</div>
                    )}
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Statistique' },
                render: () => (
                  <Tab.Pane>
                    <div style={{ height: '20em', textAlign: 'center' }}> cette page est en developement</div>
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'users', icon: 'vcard', content: 'Mon profil' },
                render: () => (
                  <Tab.Pane>
                    <Update />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                render: () => (
                  <Tab.Pane>
                    <Messages prodowner={id} />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        ) : (
          <Tab
            panes={[
              {
                menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                render: () => (
                  <Tab.Pane>
                    <Messages prodowner={id} />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Statistique' },
                render: () => (
                  <Tab.Pane>
                    <div style={{ height: '20em', textAlign: 'center' }}> cette page est en developement</div>
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'users', icon: 'vcard', content: 'Mon profil' },
                render: () => (
                  <Tab.Pane>
                    <Update />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: { key: 'statis', icon: 'pie chart', content: 'Store favories' },
                render: () => (
                  <Tab.Pane>
                    <FollowStoreView />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        )}

        {statu === 'vendeur' ? (
          <AddProductTablet>
            <Popup
              trigger={
                <Button onClick={this.addProducts} color="blue" circular animated>
                  <Button.Content visible>
                    <Icon name="plus" />
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="add to cart" />
                  </Button.Content>
                </Button>
              }
              content="ajouter un nouveau produit!!"
              on="hover"
            />
          </AddProductTablet>
        ) : (
          ''
        )}
      </ContentTabelTab>
    );

    const MobileWraper = styled.div`
      position: relative;
      top: 1em;
      width: 100%;
      border: none;
    `;

    const MobileView = () => (
      <MobileWraper>
        <Grid>
          <Grid.Row>
            <img
              width="100%"
              height="110"
              alt=""
              src={
                profil
                  ? `${profil}`
                  : 'store-icon.png'
              }
            />
            <MobileAvatar>
              <img
                width="75"
                height="75"
                borderRadius="100px"
                alt=""
                src={avatar ? `${avatar}` : '/afriqua.png'}
              />
            </MobileAvatar>
          </Grid.Row>

          <Grid.Row style={{ marginTop: '-55px' }}>
            {business ? (
              <Tab
                panes={[
                  {
                    menuItem: 'Mes Produits',
                    render: () => (
                      <Tab.Pane>
                        {product.length !== 0 ? (
                          <Grid divided="vertically" block="true">
                            <Grid.Row columns={2}>
                              {product.map(prod => (
                                <Grid.Column key={prod.id}>
                                  <MobileHomeProduct
                                    key={prod.id}
                                    prodName={prod.prodname}
                                    proDescription={prod.prodescription}
                                    imagelink={prod.prodimages[0]}
                                    prodPrice={prod.prodprice}
                                    prodId={prod.id}
                                    owner
                                  />
                                </Grid.Column>
                              ))}
                            </Grid.Row>
                          </Grid>
                        ) : (
                          <div style={{ width: '100%', textAlign: 'center', height: '20em' }}>pas de produit pur le moment</div>
                        )}
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Mon Profil',
                    render: () => (
                      <Tab.Pane>
                        <Update />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                    render: () => (
                      <Tab.Pane>
                        <Messages prodowner={id} userAvatar={avatar} businessName={business} />
                      </Tab.Pane>
                    ),
                  },
                  // {
                  //   menuItem: <Menu.Item key="favories">Stores</Menu.Item>,
                  //   render: () => (
                  //     <Tab.Pane>
                  //       <div> tous mes magasin farories</div>
                  //     </Tab.Pane>
                  //   ),
                  // },
                ]}
              />
            ) : (
              <Tab
                panes={[
                  {
                    menuItem: <Menu.Item key="messages">Messages</Menu.Item>,
                    render: () => (
                      <Tab.Pane>
                        <Messages prodowner={id} />
                      </Tab.Pane>
                    ),
                  },
                  // {
                  //   menuItem: <Menu.Item key="favories">Stores</Menu.Item>,
                  //   render: () => (
                  //     <Tab.Pane>
                  //       <FollowStoreView />
                  //     </Tab.Pane>
                  //   ),
                  // },
                  {
                    menuItem: 'Mon Profil',
                    render: () => (
                      <Tab.Pane>
                        <Update />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            )}
          </Grid.Row>
        </Grid>
      </MobileWraper>
    );

    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <div style={{ backgroundColor: '#eeeeee' }}>
            <Container>
              <BigMenu />
              <MobileView />
            </Container>
          </div>
        </Responsive>

        <Responsive {...Responsive.onlyTablet}>
          <div style={{ backgroundColor: '#eeeeee', height: '100%', marginTop: 10 }}>
            <BigMenu />
            <Container>
              {profil ? (
                <ProfilImage src={`${profil}`} />
              ) : (
                <ProfilImage src="store-icon.png" />
              )}
              <TabletAvatar>
                {avatar ? (
                  <Image
                    style={{ width: '180px', height: '180px' }}
                    size="medium"
                    circular
                    src={`${avatar}`}
                  />
                ) : (
                  <Image style={{ width: '238px', height: '238px' }} src="afriqua.png" />
                )}
              </TabletAvatar>
              <TabletView />
              {/* <AboutWrap>
                <About allName={allname} about={abouts} statu={statu} store={entreprise} owner={id} />
              </AboutWrap> */}
            </Container>
          </div>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          {' '}
          <div style={{ backgroundColor: '#eeeeee', height: '100%', marginTop: 10 }}>
            <BigMenu />
            <Container>
              {profil ? (
                <ProfilImage src={`${profil}`} />
              ) : (
                <ProfilImage src="store-icon.png" />
              )}
              <Avatar>
                {avatar ? (
                  <Image
                    style={{ width: '238px', height: '238px' }}
                    src={`${avatar}`}
                  />
                ) : (
                  <Image style={{ width: '238px', height: '238px' }} src="afriqua.png" />
                )}
              </Avatar>
              <ComputerView />
              <AboutWrap>
                <About allName={allname} about={abouts} statu={statu} store={entreprise} owner={id} />
              </AboutWrap>
            </Container>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

// const List = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

export default compose(
  graphql(meQuery, { name: 'meQuery' }),
  graphql(getUserAllProductQuery, { name: 'getUserAllProductQuery' })
)(Profil);
