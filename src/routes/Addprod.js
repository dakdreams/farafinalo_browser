import React from 'react';
import { graphql, compose } from 'react-apollo';
import axios from 'axios';
import { Form, Container, Message, Dimmer, Loader, Grid, Responsive, Button, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';

import config from '../config';

import Menu from '../responsive/menu';
import { addProductMutation, getOwnerProductQuery, updateProductQuery, meQuery } from '../graphql/queries';

// const options = [{ key: 'm', text: 'Meuble maison', value: 'meuble' }, { key: 'v', text: 'Vestimentaire', value: 'vestimentaire' }];

// const options2 = [
//   { key: '2j', text: '2 jour', value: '2 jour' },
//   { key: '1s', text: '1 semaine', value: '1 semaine' },
//   { key: '1m', text: '1 mois', value: '1 mois' },
//   { key: '3m', text: '3 mois', value: '3 mois' },
//   { key: '6m', text: '6 mois', value: '6 mois' },
//   { key: '1a', text: '1 ans', value: '1 ans' },
// ];

// const SampleNextArrow = props => {
//   const { className, style, onClick } = props;
//   return (
//     // eslint-disable-next-line
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     />
//   );
// };

// const SamplePrevArrow = props => {
//   const { className, style, onClick } = props;
//   return (
//     // eslint-disable-next-line
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     />
//   );
// };

class addprodLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prodname: '',
      prodnameError: '',
      prodprice: 0,
      prodpriceError: '',
      prodcathegory: 'meuble',
      prodcathegoryError: '',
      prodescription: '',
      prodescriptionError: '',
      prodstock: 0,
      prodstockError: '',
      prodgaranties: '1 jour',
      prodgarantiesError: '',
      prodtransport: 'charge du client',
      prodimages: [],
      loading: false,
      photoIndex: 0,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.auth();
  }

  onDrop = async files => {
    this.setState({ loading: true });
    const value1 = [];
    if (files.length < 3) {
      return this.setState({ dropError: 'vous devevier poster au minimum trois photos du produit' });
    } else if (files.length > 6) {
      return this.setState({ dropError: 'vous ne pouver pas poster plus de 5 photo du produit' });
    }
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', config.CLOUDINARY.UPLOAD_PRESET);
      formData.append('api_key', config.API_KEY);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(config.CLOUDINARY.URL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          value1.push(fileURL);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      this.setState({ prodimages: value1, loading: false });
    });
  };

  getGaranties = async event => {
    await this.setState({ prodgaranties: event.target.value });
  };

  getStransport = async event => {
    await this.setState({ prodtransport: event.target.value });
  };

  getCathegorie = async event => {
    await this.setState({ prodcathegory: event.target.value });
  };

  handleChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  auth = async () => {
    // to update a product
    const url = await this.props.location.search;
    if (url) {
      const id = await url.substr(4);
      const response = await this.props.getOwnerProductQuery({
        variables: { id },
      });
      const result = await response.data.getOwnerProduct.productOne;
      if (!result) {
        this.props.history.push('/');
      } else {
        const { prodcathegory, prodgaranties, prodescription, prodimages, prodname, prodprice, prodstock, prodtransport, owner } = result;
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
      }
    }
  };

  submit = async () => {
    this.setState({
      prodnameError: '',
      prodpriceError: '',
      prodcathegoryError: '',
      prodescriptionError: '',
      prodstockError: '',
      prodgarantiesError: '',
    });

    const { prodname, prodprice, prodescription, prodstock, prodcathegory, prodgaranties, prodimages, prodtransport } = this.state;
    // update data querys
    const url = await this.props.location.search;
    if (url) {
      const id = await url.substr(4);
      const response = await this.props.updateProductQuery({
        variables: {
          id,
          prodname,
          prodprice,
          prodescription,
          prodstock,
          prodcathegory,
          prodgaranties,
          prodimages,
          prodtransport,
        },
      });

      const { ok, errors } = response.data.updateProduct;

      if (ok) {
        window.location.replace('/');
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          // err['passwordError'] = 'too long..';
          err[`${path}Error`] = message;
        });

        this.setState(err);
      }
    } else {
      const response = await this.props.addProductMutation({
        variables: {
          prodname,
          prodprice,
          prodescription,
          prodstock,
          prodcathegory,
          prodgaranties,
          prodimages,
          prodtransport,
        },
      });

      const { ok, errors } = response.data.addProduct;

      if (ok) {
        window.location.replace('/');
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          // err['passwordError'] = 'too long..';
          err[`${path}Error`] = message;
        });

        this.setState(err);
      }
    }
  };
  render() {
    const { me = [] } = this.props.meQuery;
    const { business } = me;
    const {
      prodname,
      prodnameError,
      prodprice,
      prodimages,
      prodpriceError,
      prodcathegoryError,
      prodescriptionError,
      prodstockError,
      prodgarantiesError,
      prodgaranties,
      prodcathegory,
      prodescription,
      prodstock,
      prodtransport,
      loading,
      photoIndex,
      isOpen,
      dropError,
    } = this.state;
    const errorList = [];

    if (prodnameError) {
      errorList.push(prodnameError);
    }

    if (prodpriceError) {
      errorList.push(prodpriceError);
    }

    if (prodcathegoryError) {
      errorList.push(prodcathegoryError);
    }

    if (prodescriptionError) {
      errorList.push(prodescriptionError);
    }

    if (prodstockError) {
      errorList.push(prodstockError);
    }

    if (prodgarantiesError) {
      errorList.push(prodgarantiesError);
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    const DropDefaultImages = () => {
      if (dropError) {
        return <div style={{ width: '100%', height: '100%' }}>{dropError}</div>;
      } else if (loading) {
        return (
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
        );
      } else if (prodimages[0]) {
        return (
          <Slider {...settings2}>
            {prodimages.map(url => (
              <div key={url}>
                <img src={url} style={{ width: '100%', height: '100%' }} alt="" />
              </div>
            ))}
          </Slider>
        );
      }

      return (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgV7qMrmizS-mkV5kZRcnQuXNJM0zx4TnFV-yYHiiid69B7WHB"
          width="100%"
          height="100%"
          alt=""
        />
      );
    };
    return (
      <Segment.Group style={{ backgroundColor: '#eeeeee' }}>
        <Responsive {...Responsive.onlyMobile}>
          <Container>
            <Menu />
          </Container>
        </Responsive>
        <Responsive minWidth={768}>
          <Menu />
        </Responsive>

        {business ? (
          <div style={{ marginTop: 35, paddingTop: 0 }}>
            {isOpen && (
              <Lightbox
                mainSrc={prodimages[photoIndex]}
                nextSrc={prodimages[(photoIndex + 1) % prodimages.length]}
                prevSrc={prodimages[(photoIndex + prodimages.length - 1) % prodimages.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
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
            <Message
              icon="inbox"
              header="a votre attension"
              content="veiller enregistres uniquement dans votre magasin des produit node in africa mercie"
            />
            <Grid>
              <Grid.Column only="mobile computer" computer={6} mobile={6} textAlign="center">
                <div>
                  <h4>images de votre produit</h4>
                  <Slider {...settings}>
                    {prodimages.map(url => (
                      <div key={url}>
                        <img src={url} width="100%" height="100%" onClick={() => this.setState({ isOpen: true })} alt="" />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Grid.Column>
              <Grid.Column floated="right" tablet={16} computer={10} mobile={10}>
                <Container text>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Input
                        error={!!prodnameError}
                        name="prodname"
                        onChange={this.handleChange}
                        value={prodname}
                        fluid
                        label="Nom du produit:"
                        placeholder="Nom"
                      />
                      <Form.Input
                        error={!!prodpriceError}
                        name="prodprice"
                        onChange={this.handleChange}
                        value={prodprice}
                        fluid
                        label="Prix du Produit (fcfa):"
                        placeholder="Prix en fcfa"
                      />
                      {/* <Form.Select
                      name="prodcathegory"
                      fluid
                      onChange={this.getCathegorie}
                      label="cathegorie de produit"
                      options={options}
                      defaultValue={prodcathegory}
                    /> */}
                      <Form.Field label="cathegorie de produit:" control="select" value={prodcathegory} onChange={this.getCathegorie}>
                        <optgroup label="Mobilies">
                          <option value="decoration">Decoration</option>
                          <option value="lit">Lit</option>
                          <option value="tableau">tableau</option>
                          <option value="porcelaine">porcelaine</option>
                          <option value="canape">Canape</option>
                        </optgroup>
                        <optgroup label="Modes Femme">
                          <option value="chaussureF">Chaussure</option>
                          <option value="vetementF">Vetements</option>
                          <option value="sacF">Sacs</option>
                          <option value="accessoire">Accessoire</option>
                        </optgroup>
                        <optgroup label="Modes Homme">
                          <option value="chaussureH">Chaussure</option>
                          <option value="vetementH">Vetements</option>
                          <option value="sacH">Sacs</option>
                          <option value="accessoireH">Accessoire</option>
                        </optgroup>
                        <optgroup label="Technologies">
                          <option value="materiels">Materiels</option>
                          <option value="logiciel">Logiciel</option>
                        </optgroup>
                        <option value="autre">Autre</option>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        error={!!prodstockError}
                        name="prodstock"
                        onChange={this.handleChange}
                        value={prodstock}
                        fluid
                        label="quantiter disponible en stoke:"
                        placeholder="00"
                      />
                      {/* <Form.Select
                      name="prodgaranties"
                      fluid
                      onChange={this.getGaranties}
                      label="garanties de l article"
                      options={options2}
                      selected
                      defaultValue={prodgaranties}
                      // placeholder="garanties de l article"
                    /> */}
                      <Form.Field label="garanties de l article:" control="select" value={prodgaranties} onChange={this.getGaranties}>
                        <option value="1 jour">1 jour</option>
                        <option value="2 jour">1 jour</option>
                        <option value="1 semaine">1 semaine</option>
                        <option value="1 mois">1 mois</option>
                        <option value="3 mois">3 mois</option>
                        <option value="6 mois">6 mois</option>
                        <option value="1 ans">1 ans</option>
                      </Form.Field>
                      <Form.Field label="transport du produit:" control="select" value={prodtransport} onChange={this.getStransport}>
                        <option value="charge du client">charge du client</option>
                        <option value="a votre charge">a votre charge</option>
                      </Form.Field>
                    </Form.Group>
                    <Form.TextArea
                      error={!!prodescriptionError}
                      name="prodescription"
                      onChange={this.handleChange}
                      value={prodescription}
                      label="description"
                      placeholder="description doit etre superieur a 250 caratere pour nieux referancier votre produit"
                    />

                    <Grid.Column>
                      <Dropzone style={{ height: '100%', width: '80%', border: 'dashed' }} multiple accept="image/*" onDrop={this.onDrop}>
                        {DropDefaultImages}
                      </Dropzone>
                    </Grid.Column>
                  </Form>
                  {prodnameError || prodcathegoryError || prodpriceError || prodescriptionError || prodstockError || prodgarantiesError ? (
                    <Message error header=" erreur verifier vos donner " list={errorList} />
                  ) : null}
                  <Button color="blue" style={{ marginTop: 15 }} onClick={this.submit}>
                    envoyer
                  </Button>
                </Container>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <p style={{ marginTop: 500 }}> desoler vos n est pas pour le moment un vendeur veilleur modifier votre status dans vos profil </p>
        )}
      </Segment.Group>
    );
  }
}

export default compose(
  graphql(getOwnerProductQuery, { name: 'getOwnerProductQuery' }),
  graphql(addProductMutation, { name: 'addProductMutation' }),
  graphql(updateProductQuery, { name: 'updateProductQuery' }),
  graphql(meQuery, { name: 'meQuery' })
)(addprodLayout);
