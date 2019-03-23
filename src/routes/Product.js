import React from 'react';
import { graphql, compose, Query } from 'react-apollo';
import {
  Grid,
  Tab,
  Container,
  Image,
  Segment,
  Responsive,
  Rating,
  Button,
  Icon,
  Modal,
  Header,
  Form,
  Message,
  Statistic,
  Loader,
  Dimmer,
  List,
} from 'semantic-ui-react';
import Slider from 'react-slick';
import uuidv4 from 'uuid/v4';
import Lightbox from 'react-image-lightbox';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import BigMenu from '../responsive/menu';
import Comments from '../components/comment';
import Tabeau from '../components/tableau';
import MobileTableau from '../components/mobileTableau';
import Product from '../components/homeProduct';
import {
  getProductQuery,
  getOwnerInfoQuery,
  makeCommentQuery,
  simularCathegoryQuery,
  checkLikesQuery,
  meQuery,
  getProdCommentQuery,
  likeQuery,
  getLikesQuery,
  getScoreQuery,
} from '../graphql/queries';

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

class product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodescription: '',
      prodcathegory: '',
      prodtransport: '',
      prodimages: [],
      prodname: '',
      prodid: '',
      prodprice: '',
      prodstock: '',
      owner: '',
      profil: '',
      ownerAvatar: '',
      about: '',
      business: '',
      tell: '',
      tell2: '',
      autoplay: true,
      photoIndex: 0,
      isOpen: false,
      commentText: '',
      checked: true,
    };
  }

  componentDidMount() {
    this.auth();
  }

  getCommentText = (e, { value }) => {
    this.setState({ commentText: value });
  };

  commetSubmit = async (connectUserName, connectUserAvatar) => {
    const id = await this.props.match.params.id;
    const prodid = id;
    await this.props.makeCommentQuery({
      variables: {
        text: this.state.commentText,
        prodid: id,
        prodowner: this.state.owner,
        usercommentname: connectUserName,
        usercommentavatar: connectUserAvatar,
      },
      refetchQueries: [{ query: getProdCommentQuery, variables: { prodid } }],
    });
    this.setState({ commentText: '' });
  };

  auth = async () => {
    const id = await this.props.match.params.id;
    const response = await this.props.getProductQuery({
      variables: { id },
    });
    const result = await response.data.getProduct.productOne;
    if (!result) {
      this.props.history.push('/');
    } else {
      const { prodcathegory, prodescription, prodimages, prodname, prodprice, prodstock, owner, prodgaranties, prodtransport } = result;
      await this.setState({
        prodcathegory,
        prodescription,
        prodimages,
        prodname,
        prodprice,
        prodstock,
        prodtransport,
        owner,
        prodid: id,
        prodgaranties,
      });
      const response1 = await this.props.getOwnerInfoQuery({
        variables: { id: owner },
      });
      const { profil, business, about, tell, tell2, avatar } = await response1.data.ownerInfo.user;
      await this.setState({
        profil,
        business,
        ownerAvatar: avatar,
        tell,
        tell2,
        about,
      });

      const response2 = await this.props.checkLikesQuery({
        variables: { productId: id },
      });
      const check = await response2.data.checkLikes.ok;

      await this.setState({ checked: check });
    }
  };

  handleRate = async (e, { rating }) => {
    if (!this.state.checked) {
      const id = await this.props.match.params.id;
      await this.props.likeQuery({
        variables: {
          productId: id,
          score: rating,
        },
        refetchQueries: [{ query: getScoreQuery, variables: { productId: id } }],
      });
      this.setState(prevState => ({ like: prevState.like + 1 }));
    }
  };

  render() {
    const idd = this.props.match.params.id;
    const { me = [] } = this.props.meQuery;
    const { firstname, avatar, secondname, id } = me;
    const connectUserName = `${secondname} ${firstname}`;
    const connectUserAvatar = avatar;
    const {
      prodimages,
      prodescription,
      photoIndex,
      isOpen,
      profil,
      business,
      tell,
      tell2,
      about,
      prodprice,
      commentText,
      prodid,
      owner,
      prodcathegory,
      prodtransport,
      prodgaranties,
      prodname,
      prodstock,
      ownerAvatar,
      checked,
    } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: this.state.autoplay,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    const titi = !firstname;

    const cathegory = prodcathegory;

    const settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: this.state.autoplay,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const canLike = checked || titi;

    const GetLikesQueryResponse = () => (
      <Query query={getLikesQuery} variables={{ productId: prodid }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const getLikesData = data.getLikes.LikeProducts;
          const likes = getLikesData.length;
          if (likes === 0) return 'note le produit';
          return likes;
        }}
      </Query>
    );

    const Scorevalue = () => (
      <Query query={getScoreQuery} variables={{ productId: idd }}>
        {({ loading, data }) => {
          if (loading) return null;
          const getScoreData = data.getScore.prodScore;
          const likers = getScoreData.length;
          if (likers === 0) {
            return (
              <Rating
                onRate={this.handleRate}
                style={{ marginLeft: '5%', marginTop: '-30px' }}
                icon="star"
                defaultRating={1}
                maxRating={5}
                disabled={canLike}
              />
            );
          }
          const score = getScoreData.map(a => a.score);
          const scoreReduce = score.reduce((acc, cur) => acc + cur);
          const finalScore = Math.trunc(scoreReduce / likers);
          return (
            <Rating
              onRate={this.handleRate}
              style={{ marginLeft: '5%', marginTop: '-30px' }}
              icon="star"
              defaultRating={finalScore}
              maxRating={5}
              disabled={canLike}
            />
          );
        }}
      </Query>
    );

    const ComputerProduct = () => (
      <Query query={simularCathegoryQuery} variables={{ cathegory, prodid }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Dimmer active inverted>
                <Loader size="medium">Loading</Loader>
              </Dimmer>
            );
          }
          if (error) return `Error! ${error.message}`;

          const { products } = data.simularCathegory;

          return (
            <div>
              <Responsive {...Responsive.onlyComputer}>
                <Grid.Column>
                  <Grid>
                    <Grid.Row>
                      {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                      {products.map(prod => (
                        <Grid.Row key={prod.id}>
                          <Product
                            key={prod.id}
                            prodName={prod.prodname}
                            proDescription={prod.prodescription}
                            imagelink={prod.prodimages[0]}
                            prodPrice={prod.prodprice}
                            prodId={prod.id}
                          />
                        </Grid.Row>
                      ))}
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Responsive>

              <Responsive {...Responsive.onlyTablet}>
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
              </Responsive>
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
              <Grid style={{ marginTop: '20px' }}>
                {isOpen && (
                  <Lightbox
                    mainSrc={prodimages[photoIndex]}
                    nextSrc={prodimages[(photoIndex + 1) % prodimages.length]}
                    prevSrc={prodimages[(photoIndex + prodimages.length - 1) % prodimages.length]}
                    onCloseRequest={() => this.setState({ isOpen: false, autoplay: true })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + prodimages.length - 1) % prodimages.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + 1) % prodimages.length,
                      })
                    }
                  />
                )}

                <Grid.Row>
                  <Grid.Column width={16}>
                    <Slider {...settings2}>
                      {prodimages.map(url => (
                        <div key={uuidv4()}>
                          <img src={url} width="190" height="150" onClick={() => this.setState({ isOpen: true, autoplay: false })} alt="" />
                        </div>
                      ))}
                    </Slider>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{}}>
                  <Grid.Column style={{ fontSize: 'smaller' }} width={15}>
                    {prodescription.substr(0, 150)}
                  </Grid.Column>
                </Grid.Row>

                <Grid.Column style={{ padding: 0, color: 'red', fontSize: 16 }} textAlign="center" width={15}>
                  <NumberFormat value={prodprice} displayType={'text'} thousandSeparator=" " suffix={' Fcfa'} />
                </Grid.Column>

                <Grid.Row columns={2}>
                  <Grid.Column width={3}>
                    <img src={'http://www.myownbali.com/wp-content/uploads/store-icon.png'} width="30" height="30" alt="" />
                  </Grid.Column>
                  <Grid.Column width={6} textAlign="center">
                    <Link to={`/store/${owner}`}>
                      <h3 style={{ fontSize: 14 }}>{business}</h3>
                    </Link>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <div>
                      <Modal trigger={<Button size="tiny">Mes Contacts</Button>} basic size="small" closeIcon>
                        <Header icon="call square" content="Appeler pour plus d info" />
                        <Modal.Content>
                          <p>
                            <a style={{ fontSize: 20 }}>{tell2}</a>
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color="green" inverted>
                            <Icon name="call" /> <a href={`tel: +225${tell2}`}> Appeler</a>
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3} divided>
                  <Grid.Column>
                    <Scorevalue />
                  </Grid.Column>
                  <Grid.Column>
                    <Icon size="small" name="users" />
                    <GetLikesQueryResponse />
                  </Grid.Column>
                  <Grid.Column>
                    <Button size="mini" inverted color="red">
                      signaler
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid.Row style={{ marginTop: 15 }}>
                <Tab
                  menu={{ secondary: true, pointing: true }}
                  panes={[
                    {
                      menuItem: 'Detail',
                      render: () => (
                        <Tab.Pane attached={false}>
                          <Grid.Row>
                            <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                              Nom du produit
                            </Header>
                            <Segment style={{ fontSize: 'smaller' }} color="black" raised>
                              {prodname}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row style={{ marginTop: 10 }}>
                            <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                              Description
                            </Header>
                            <Segment style={{ fontSize: 'smaller' }} color="green" raised>
                              {prodescription}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row style={{ marginTop: 10 }}>
                            <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                              Qantite restans au stoke
                            </Header>
                            <Segment style={{ fontSize: 'smaller' }} color="red" raised>{`il ne reste plus que ${prodstock}`}</Segment>
                          </Grid.Row>
                          <Grid.Row style={{ marginTop: 10, marginBottom: 20 }}>
                            <Header style={{ fontSize: 'smaller' }} color="orange" as="h5">
                              Garanties {prodgaranties}
                            </Header>
                            <Segment color="blue" raised>
                              <h3 style={{ fontSize: 'smaller' }}>vous ete intregralement renbource si :</h3>
                              <List style={{ fontSize: 'smaller' }} divided relaxed>
                                <List.Item>le produit n est pas identique au produit commander sur le site.</List.Item>
                                <List.Item>le produit est defectuer.</List.Item>
                                <List.Item>
                                  le produit n est pas n est pas a plus de <b> 30% confectioner en afrique</b>.
                                </List.Item>
                              </List>
                            </Segment>
                          </Grid.Row>
                        </Tab.Pane>
                      ),
                    },
                    {
                      menuItem: 'livraison',
                      render: () => (
                        <Tab.Pane>
                          <MobileTableau cat={prodcathegory} trans={prodtransport} />
                        </Tab.Pane>
                      ),
                    },
                    {
                      menuItem: 'avis',
                      render: () => (
                        <Tab.Pane>
                          <Grid>
                            <Grid.Row style={{ paddingTop: 0 }}>
                              <Form style={{ width: '95%' }} reply>
                                <Form.TextArea
                                  style={{ fontSize: 12 }}
                                  name="prodescription"
                                  onChange={this.getCommentText}
                                  value={commentText}
                                  placeholder="text"
                                />
                                {firstname ? (
                                  <Button
                                    size="small"
                                    content="commenter"
                                    labelPosition="right"
                                    icon="edit"
                                    primary
                                    onClick={() => this.commetSubmit(connectUserName, connectUserAvatar)}
                                  />
                                ) : (
                                  <Button
                                    color="green"
                                    size="small"
                                    content="connecter vous pour commenter"
                                    labelPosition="right"
                                    icon="users"
                                    onClick={() => this.props.history.push('/login')}
                                  />
                                )}
                              </Form>
                            </Grid.Row>
                            <Grid.Row style={{ marginTop: 5 }}>
                              <Comments prodId={prodid} connectUser={id} ownerId={owner} />
                            </Grid.Row>
                          </Grid>
                        </Tab.Pane>
                      ),
                    },
                    {
                      menuItem: 'Garanties',
                      render: () => (
                        <Tab.Pane attached={false}>
                          <div>
                            <Segment style={{ fontSize: 12 }} raised>
                              la garanties de reprise du produit offerte est de: <b style={{ color: 'red' }}>{prodgaranties}</b>
                            </Segment>
                            <Segment raised>
                              <h3 style={{ fontSize: 12 }}>vous ete intregralement renbource si :</h3>
                              <List style={{ fontSize: 12 }} divided relaxed>
                                <List.Item>le produit n est pas identique au produit commander sur le site.</List.Item>
                                <List.Item>le produit est defectuer.</List.Item>
                                <List.Item>
                                  le produit n est pas n est pas a plus de <b> 30% confectioner en afrique</b>.
                                </List.Item>
                              </List>
                            </Segment>

                            <Grid>
                              <Grid.Column style={{ fontSize: 12 }} textAlign="right">
                                <Button size="tiny" fluid color="green">
                                  commander maintenamt
                                </Button>
                              </Grid.Column>
                            </Grid>
                          </div>
                        </Tab.Pane>
                      ),
                    },
                  ]}
                />
              </Grid.Row>
            </Container>
          </div>
        </Responsive>
        {/* <Responsive {...Responsive.onlyTablet}>salut</Responsive> */}
        <Responsive minWidth={768}>
          <div style={{ backgroundColor: '#fcfcfc' }}>
            {isOpen && (
              <Lightbox
                mainSrc={prodimages[photoIndex]}
                nextSrc={prodimages[(photoIndex + 1) % prodimages.length]}
                prevSrc={prodimages[(photoIndex + prodimages.length - 1) % prodimages.length]}
                onCloseRequest={() => this.setState({ isOpen: false, autoplay: true })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + prodimages.length - 1) % prodimages.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % prodimages.length,
                  })
                }
              />
            )}
            <BigMenu />
            <Grid style={{ marginTop: '40px' }}>
              <Grid.Column style={{ marginLeft: '20px' }} floated="left" tablet={15} computer={12}>
                <div style={{ width: '100%' }}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Image
                          label={{
                            as: 'a',
                            color: 'green',
                            content: 'Ouvert',
                            icon: 'home',
                            ribbon: true,
                          }}
                          style={{ height: '8em' }}
                          src={profil ? `${profil}` : 'http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg'}
                        />
                      </Grid.Column>
                      <Grid.Column width={12}>
                        <div>
                          <Link to={`/store/${owner}`}>
                            <Image
                              style={{ height: '3em' }}
                              src="https://image.freepik.com/psd-gratuitement/petit-magasin-icone-psd_30-2392.jpg"
                              verticalAlign="middle"
                            />
                            <h3>{business}</h3>
                          </Link>
                          <p>{about}</p>
                        </div>
                        <Grid.Row style={{ marginTop: 20 }}>
                          <Grid columns="equal">
                            <Grid.Column width={8}>
                              <Rating icon="star" defaultRating={3} maxRating={5} disabled />
                            </Grid.Column>
                            <Grid.Column width={8}>
                              <div>
                                <Modal trigger={<Button>Mes Contacts</Button>} basic size="small" closeIcon>
                                  <Header icon="phone square" content="appel moi pour plus d info" />
                                  <Modal.Content>
                                    <Grid columns={2} divided>
                                      <Grid.Row stretched>
                                        <Grid.Column>
                                          <Image
                                            // style={{ height: 'em' }}
                                            size="medium"
                                            src={
                                              ownerAvatar
                                                ? `${ownerAvatar}`
                                                : 'http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg'
                                            }
                                          />
                                        </Grid.Column>
                                        <Grid.Column>
                                          <div>
                                            <Header as="h2" style={{ fontSize: 40, color: 'green' }}>
                                              {business}
                                            </Header>
                                            <a style={{ fontSize: 30, padding: 15 }}>
                                              {' '}
                                              <Icon name="phone" /> {tell2}
                                            </a>{' '}
                                            <br />
                                            <a style={{ fontSize: 30, padding: 15 }}>
                                              {' '}
                                              <Icon name="phone" /> {tell}
                                            </a>
                                          </div>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Modal.Content>
                                </Modal>
                              </div>
                            </Grid.Column>
                          </Grid>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ marginTop: '2em' }}>
                      <Grid.Column>
                        <Responsive {...Responsive.onlyTablet}>
                          <Slider {...settings}>
                            {prodimages.map(url => (
                              <div key={uuidv4()}>
                                <img src={url} width="360" height="250" onClick={() => this.setState({ isOpen: true, autoplay: false })} alt="" />
                              </div>
                            ))}
                          </Slider>
                        </Responsive>
                        <Responsive {...Responsive.onlyComputer}>
                          <Slider {...settings}>
                            {prodimages.map(url => (
                              <div key={uuidv4()}>
                                <img src={url} width="460" height="350" onClick={() => this.setState({ isOpen: true, autoplay: false })} alt="" />
                              </div>
                            ))}
                          </Slider>
                        </Responsive>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Button style={{ marginLeft: '90%' }} size="mini" inverted color="red">
                        <Icon name="flag outline" />
                        signaler
                      </Button>
                      <Scorevalue />
                      <Statistic size="mini" style={{ marginLeft: '1.5%', marginTop: '-34px' }}>
                        <Statistic.Value>
                          <Icon size="small" name="users" />
                          <GetLikesQueryResponse />
                        </Statistic.Value>
                      </Statistic>
                      <Grid.Column style={{ padding: 0, marginTop: 0, color: 'red', fontSize: 20 }} textAlign="center" width={15}>
                        <NumberFormat value={prodprice} displayType={'text'} thousandSeparator=" " suffix={' Fcfa'} />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Tab
                          menu={{ secondary: true, pointing: true }}
                          panes={[
                            {
                              menuItem: 'Detail',
                              render: () => (
                                <Tab.Pane attached={false}>
                                  <Grid.Row>
                                    <Header color="orange" as="h5">
                                      Nom du produit
                                    </Header>
                                    <Segment color="black" compact>
                                      {prodname}
                                    </Segment>
                                  </Grid.Row>
                                  <Grid.Row style={{ marginTop: 10 }}>
                                    <Header color="orange" as="h5">
                                      Description
                                    </Header>
                                    <Segment color="green" compact>
                                      {prodescription}
                                    </Segment>
                                  </Grid.Row>
                                  <Grid.Row style={{ marginTop: 10 }}>
                                    <Header color="orange" as="h5">
                                      Qantite restans au stoke
                                    </Header>
                                    <Segment color="red" compact>{`il ne reste plus que ${prodstock}`}</Segment>
                                  </Grid.Row>
                                </Tab.Pane>
                              ),
                            },
                            {
                              menuItem: 'Livraison et paiement',
                              render: () => (
                                <Tab.Pane attached={false}>
                                  <Tabeau cat={prodcathegory} trans={prodtransport} />
                                </Tab.Pane>
                              ),
                            },
                            {
                              menuItem: 'Avis',
                              render: () => (
                                <Tab.Pane attached={false}>
                                  <Grid divided="vertically">
                                    <Grid.Row columns={2}>
                                      <Grid.Column>
                                        <Comments prodId={prodid} connectUser={id} ownerId={owner} />
                                      </Grid.Column>
                                      <Grid.Column>
                                        <Form reply>
                                          <Form.TextArea
                                            style={{ fontSize: 16 }}
                                            name="prodescription"
                                            onChange={this.getCommentText}
                                            value={commentText}
                                            placeholder="description doit etre superieur a 250 caratere pour nieux referancier votre produit"
                                          />
                                          {firstname ? (
                                            <Button
                                              content="commenter"
                                              labelPosition="left"
                                              icon="edit"
                                              primary
                                              onClick={() => this.commetSubmit(connectUserName, connectUserAvatar)}
                                            />
                                          ) : (
                                            <Button
                                              content="connecter vous pour pouvoire commenter"
                                              labelPosition="left"
                                              icon="users"
                                              color="green"
                                              onClick={() => this.props.history.push('/login')}
                                            />
                                          )}
                                        </Form>
                                        <Message success>
                                          <Message.Header>Farafinalo</Message.Header>
                                          <p>
                                            Nous apportons nos pierre a l edification economique et sociale de l africaine avec des commentaire
                                            constructive e l egare de nos future industruel africain!!
                                          </p>
                                        </Message>
                                      </Grid.Column>
                                    </Grid.Row>
                                  </Grid>
                                </Tab.Pane>
                              ),
                            },
                            {
                              menuItem: 'Garanties',
                              render: () => (
                                <Tab.Pane attached={false}>
                                  <div>
                                    <Segment raised>
                                      la garanties de reprise du produit offerte est de: <b style={{ color: 'red' }}>{prodgaranties}</b>
                                    </Segment>
                                    <Segment raised>
                                      <h3>vous ete intregralement renbource si :</h3>
                                      <List divided relaxed>
                                        <List.Item>le produit n est pas identique au produit commander sur le site.</List.Item>
                                        <List.Item>le produit est defectuer.</List.Item>
                                        <List.Item>
                                          le produit n est pas n est pas a plus de <b> 30% confectioner en afrique</b>.
                                        </List.Item>
                                      </List>
                                    </Segment>

                                    <Grid>
                                      <Grid.Column textAlign="right">
                                        <Button color="green">commander maintenamt</Button>
                                      </Grid.Column>
                                    </Grid>
                                  </div>
                                </Tab.Pane>
                              ),
                            },
                          ]}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Responsive {...Responsive.onlyTablet}>
                      <Grid.Row>
                        <ComputerProduct />
                      </Grid.Row>
                    </Responsive>
                  </Grid>
                </div>
              </Grid.Column>
              <Grid.Column floated="right" computer={3}>
                <Responsive {...Responsive.onlyComputer}>
                  <ComputerProduct />
                </Responsive>
              </Grid.Column>
            </Grid>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default compose(
  graphql(meQuery, { name: 'meQuery' }),
  graphql(getProductQuery, { name: 'getProductQuery' }),
  graphql(getOwnerInfoQuery, { name: 'getOwnerInfoQuery' }),
  graphql(makeCommentQuery, { name: 'makeCommentQuery' }),
  graphql(likeQuery, { name: 'likeQuery' }),
  graphql(checkLikesQuery, { name: 'checkLikesQuery' })
)(product);
