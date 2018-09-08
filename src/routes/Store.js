import React from 'react';
import { Grid, Tab, Responsive, Segment, Image, Card, Rating, Button, Label, Container, Header, Modal, Icon } from 'semantic-ui-react';
import { graphql, Query, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import BigMenu from '../responsive/menu';
import Products from '../components/product';
import config from '../config';
import {
  getOwnerInfoQuery,
  storeAllProductQuery,
  makeFollowQuery,
  meQuery,
  getFollowersQuery,
  checkFollowersQuery,
  deleteFollowQuery,
} from '../graphql/queries';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      profil: '',
      business: '',
      about: '',
      firstname: '',
      secondname: '',
      avatar: '',
    };
  }

  componentDidMount() {
    this.auth();
  }

  auth = async () => {
    const owner = await this.props.match.params.id;
    await this.setState({ owner });
    const response1 = await this.props.getOwnerInfoQuery({
      variables: { id: owner },
    });
    if (!response1) {
      window.location.replace('/');
    } else {
      const { profil, business, about, firstname, secondname, avatar } = await response1.data.ownerInfo.user;
      await this.setState({
        profil,
        business,
        about,
        firstname,
        secondname,
        avatar,
      });

      // const getFollowersResponse = await this.props.getFollowersQuery({
      //   variables: { followed: owner },
      // });

      // console.log(getFollowersResponse);
    }
  };

  follow = async () => {
    await this.props.makeFollowQuery({
      variables: { followed: this.state.owner },
      refetchQueries: [
        {
          query: getFollowersQuery,
          variables: { followed: this.state.owner },
        },
        {
          query: checkFollowersQuery,
          variables: { followed: this.state.owner },
        },
      ],
      // refetchQueries: [{ query: getFollowersQuery, variables: { followed: this.state.owner } }],
    });
  };

  defollow = async () => {
    await this.props.deleteFollowQuery({
      variables: { followed: this.state.owner },
      refetchQueries: [
        {
          query: getFollowersQuery,
          variables: { followed: this.state.owner },
        },
        {
          query: checkFollowersQuery,
          variables: { followed: this.state.owner },
        },
      ],
      // refetchQueries: [{ query: getFollowersQuery, variables: { followed: this.state.owner } }],
    });
  };

  render() {
    const { owner, profil, business, about, firstname, secondname, avatar } = this.state;
    const { me = [] } = this.props.meQuery;
    const { id } = me;
    const StoreProduct = () => (
      <Query query={storeAllProductQuery} variables={{ owner }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          if (data.storeAllProduct.products.length === 0) {
            window.location.replace('/');
          }

          return (
            <div>
              <Responsive {...Responsive.onlyComputer}>
                <Grid divided="vertically" block="true" style={{ paddingTop: 14 }}>
                  <Grid.Row columns={4}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {data.storeAllProduct.products.map(prod => (
                      <Grid.Column key={prod.id}>
                        <Products
                          key={prod.id}
                          prodName={prod.prodname}
                          proDescription={prod.prodescription}
                          imagelink={prod.prodimages[0]}
                          prodPrice={prod.prodprice}
                          prodId={prod.id}
                          noOwner
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
                    {data.storeAllProduct.products.map(prod => (
                      <Grid.Column key={prod.id}>
                        <Products
                          key={prod.id}
                          prodName={prod.prodname}
                          proDescription={prod.prodescription}
                          imagelink={prod.prodimages[0]}
                          prodPrice={prod.prodprice}
                          prodId={prod.id}
                          noOwner
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Responsive>
              <Responsive {...Responsive.onlyTablet}>
                <Grid divided="vertically" block="true" style={{ margin: 1 }}>
                  <Grid.Row columns={2}>
                    {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                    {data.storeAllProduct.products.map(prod => (
                      <Grid.Column key={prod.id}>
                        <Products
                          key={prod.id}
                          prodName={prod.prodname}
                          proDescription={prod.prodescription}
                          imagelink={prod.prodimages[0]}
                          prodPrice={prod.prodprice}
                          prodId={prod.id}
                          noOwner
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

    const GetFollowersResponse = () => (
      <Query query={getFollowersQuery} variables={{ followed: owner }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const followersData = data.getFollowers.followers;
          const abonnees = followersData.length;
          return <div> {abonnees} Abonnee</div>;
        }}
      </Query>
    );

    const CheckFollowersQueryResponse = () => (
      <Query query={checkFollowersQuery} variables={{ followed: owner }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const check = data.checkFollowers.ok;
          return (
            <div>
              {check ? (
                <Modal trigger={<Button color="red">-suivre</Button>} closeIcon>
                  <Header icon="frown" content="Se desaboner a un Magasin" />
                  <Modal.Content>
                    <p> ets vous sure de vouloire vous desabonner de {business} ?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={this.defollow}>
                      <Icon name="checkmark" /> Oui
                    </Button>
                  </Modal.Actions>
                </Modal>
              ) : (
                <Button primary onClick={this.follow}>
                  suivre +
                </Button>
              )}
            </div>
          );
        }}
      </Query>
    );
    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <Container>
              <BigMenu />
              <div>
                <Grid style={{ marginTop: '15px' }}>
                  <Grid.Row style={{ width: '100%', height: '50%' }}>
                    {profil ? (
                      <img width="100%" height="30%" alt="" src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${profil}`} />
                    ) : (
                      <img
                        width="100%"
                        height="30%"
                        alt=""
                        src="http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg"
                      />
                    )}
                  </Grid.Row>
                  <Grid.Row>
                    {avatar ? (
                      <Image
                        style={{
                          position: 'absolute',
                          top: '-5em',
                          left: '35%',
                          width: '90px',
                          height: '90px',
                        }}
                        circular
                        size="medium"
                        src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${avatar}`}
                      />
                    ) : (
                      <Image
                        style={{
                          position: 'absolute',
                          top: '-5em',
                          left: '35%',
                          width: '90px',
                          height: '90px',
                        }}
                        circular
                        size="medium"
                        src="https://www.goafricaonline.com/images/drapeaux/afrique.png"
                        // <img
                        //   style={{ borderRadius: '50%' }}
                        //   width="35%"
                        //   height="75%"
                        //   alt=""
                        //   src="https://www.goafricaonline.com/images/drapeaux/afrique.png"
                        // />
                      />
                    )}
                  </Grid.Row>
                  <Grid.Row
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '33%',
                    }}
                  >
                    {id ? (
                      <CheckFollowersQueryResponse />
                    ) : (
                      <Link to="/login">
                        <Button size="tiny" color="blue">
                          inscriver vous
                        </Button>
                      </Link>
                    )}
                    {/* <Button style={{ borderRadius: '40%' }} size="small" positive>
                      suivre +
                    </Button> */}
                  </Grid.Row>
                  <Grid.Row
                    style={{
                      position: 'absolute',
                      top: '85%',
                      left: '70%',
                      zIndex: '1',
                    }}
                  >
                    <Rating icon="star" defaultRating={3} maxRating={5} />
                  </Grid.Row>
                  <Grid.Row
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '2%',
                    }}
                  >
                    <Label as="h3" color="teal" tag>
                      {business}
                    </Label>
                  </Grid.Row>
                  <Grid.Row
                    style={{
                      position: 'absolute',
                      top: '85%',
                      left: '2%',
                    }}
                  >
                    <GetFollowersResponse />
                  </Grid.Row>
                  <Grid.Row
                    style={{
                      position: 'absolute',
                      top: '130%',
                    }}
                  >
                    <Tab
                      menu={{ secondary: true }}
                      panes={[
                        {
                          menuItem: 'Product',
                          render: () => (
                            <Tab.Pane attached={false}>
                              <StoreProduct />
                            </Tab.Pane>
                          ),
                        },
                        {
                          menuItem: 'Info Store',
                          render: () => (
                            <Tab.Pane>
                              <Grid.Row>
                                <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                                  Administrateur du store
                                </Header>
                                <Segment style={{ fontSize: 'smaller' }} color="black" raised>
                                  {firstname} {secondname}
                                </Segment>
                              </Grid.Row>
                              <Grid.Row style={{ marginTop: 10 }}>
                                <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                                  Apropos
                                </Header>
                                <Segment style={{ fontSize: 'smaller' }} color="green" raised>
                                  {about}
                                </Segment>
                              </Grid.Row>
                            </Tab.Pane>
                          ),
                        },
                      ]}
                    />
                    {/* <StoreProduct /> */}
                  </Grid.Row>
                </Grid>
              </div>
            </Container>
          </div>
        </Responsive>

        <Responsive {...Responsive.onlyTablet}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <BigMenu />
            <Grid columns={2} style={{ marginTop: 30 }}>
              <Grid.Column width={6} style={{ height: 800, paddingLeft: 20, position: 'fixed' }}>
                <Grid.Row>
                  {profil ? (
                    <img width="100%" height="200" alt="" src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${profil}`} />
                  ) : (
                    <img
                      width="100%"
                      height="200"
                      alt=""
                      src="http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg"
                    />
                  )}

                  <Card style={{ width: '100%' }}>
                    <Card.Content>
                      {avatar ? (
                        <Image floated="right" size="mini" src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${avatar}`} />
                      ) : (
                        <Image floated="right" size="mini" src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}

                      <Card.Header>{business}</Card.Header>
                      <Card.Meta>{`${secondname} ${firstname}`}</Card.Meta>
                      <Card.Description>{about}</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Header as="h3" block style={{ marginBottom: 5 }}>
                        encourager nos PME
                      </Header>
                      <Grid>
                        <Grid.Column style={{ marginTop: 8 }} floated="left" width={8}>
                          <GetFollowersResponse />
                        </Grid.Column>
                        <Grid.Column floated="right" width={8}>
                          {id ? (
                            <CheckFollowersQueryResponse />
                          ) : (
                            <Link to="/login">
                              <Button fluid>inscriver vous</Button>
                            </Link>
                          )}
                        </Grid.Column>
                      </Grid>
                      {/* <GetFollowersResponse />
                      {id ? (
                        <CheckFollowersQueryResponse />
                      ) : (
                        <Link to="/login">
                          <Button fluid>inscriver vous</Button>
                        </Link>
                      )} */}
                    </Card.Content>
                    <Card.Content extra>
                      <p>note de votre magaci</p>
                      <Rating icon="star" defaultRating={3} maxRating={5} />
                    </Card.Content>
                  </Card>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column width={10} style={{ position: 'absolute', left: '35%' }}>
                <Grid.Row columns={4}>
                  <StoreProduct />
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </div>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            <BigMenu />
            <Grid columns={2} style={{ marginTop: 30 }}>
              <Grid.Column width={4} style={{ height: 800, paddingLeft: 20, position: 'fixed' }}>
                <Grid.Row>
                  {profil ? (
                    <img width="100%" height="200" alt="" src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${profil}`} />
                  ) : (
                    <img
                      width="100%"
                      height="200"
                      alt=""
                      src="http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg"
                    />
                  )}

                  <Card style={{ width: '100%' }}>
                    <Card.Content>
                      {avatar ? (
                        <Image floated="right" size="tiny" src={`http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${avatar}`} />
                      ) : (
                        <Image floated="right" size="tiny" src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}

                      <Card.Header>{business}</Card.Header>
                      <Card.Meta>{`${secondname} ${firstname}`}</Card.Meta>
                      <Card.Description>{about}</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Header as="h3" block style={{ marginBottom: 5 }}>
                        encourager nos PME
                      </Header>
                      <Grid>
                        <Grid.Column style={{ marginTop: 8 }} floated="left" width={8}>
                          <GetFollowersResponse />
                        </Grid.Column>
                        <Grid.Column floated="right" width={8}>
                          {id ? (
                            <CheckFollowersQueryResponse />
                          ) : (
                            <Link to="/login">
                              <Button fluid>inscriver vous</Button>
                            </Link>
                          )}
                        </Grid.Column>
                      </Grid>
                      {/* <GetFollowersResponse />
                      {id ? (
                        <CheckFollowersQueryResponse />
                      ) : (
                        <Link to="/login">
                          <Button fluid>inscriver vous</Button>
                        </Link>
                      )} */}
                    </Card.Content>
                    <Card.Content extra>
                      <p>note de votre magaci</p>
                      <Rating icon="star" defaultRating={3} maxRating={5} />
                    </Card.Content>
                  </Card>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column width={12} style={{ position: 'absolute', left: '25%' }}>
                <Grid.Row columns={4}>
                  <StoreProduct />
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default compose(
  graphql(getOwnerInfoQuery, { name: 'getOwnerInfoQuery' }),
  graphql(makeFollowQuery, { name: 'makeFollowQuery' }),
  graphql(deleteFollowQuery, { name: 'deleteFollowQuery' }),
  graphql(meQuery, { name: 'meQuery' })
)(Store);
