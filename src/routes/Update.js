import React from 'react';
import { Message, Button, Container, Header, Form, TextArea, Grid, Image, Dimmer, Loader } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { graphql, compose } from 'react-apollo';
// import { Image as CloudImage } from 'cloudinary-react';
import gql from 'graphql-tag';
import axios from 'axios';
import { updateMutation, meQuery } from '../graphql/queries';

import config from '../config';

// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dg6zkrdqu/image/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'emwdybzz';
// const CLOUD_NAME = 'dg6zkrdqu';

class updating extends React.Component {
  state = {
    firstname: '',
    firstnameError: '',
    secondname: '',
    secondnameError: '',
    email: '',
    emailError: '',
    about: '',
    statu: '',
    business: '',
    tell: '',
    tell2: '',
    file: null,
    avatar: '',
    profil: '',
    loading1: false,
    loading2: false,
  };

  componentDidMount() {
    this.auth();
  }

  onSubmit = async () => {
    this.setState({
      firstnameError: '',
      secondnameError: '',
      emailError: '',
      aboutError: '',
      businessError: '',
      statuError: '',
      tell2Error: '',
      tellError: '',
    });

    const { firstname, secondname, email, about, business, statu, tell2, tell } = this.state;
    const response = await this.props.updateMutation({
      variables: { firstname, secondname, email, about, business, statu, tell2, tell },
    });

    const { errors } = response.data.updating;

    if (errors) {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });

      this.setState(err);
    } else {
      window.location.reload();
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  onDrop = async ([file]) => {
    this.setState({ file, loading1: true });

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', config.CLOUDINARY.UPLOAD_PRESET);

    const response = await axios.post(config.CLOUDINARY.URL, formData);

    const clourl = await response.data.secure_url;

    // const clourl = await `v${response.data.version}/${response.data.public_id}.${response.data.format}`;

    // const { preview, name, type, size } = file;
    // const path = preview.substring(27);
    // console.log(path);

    await this.props
      .uploadFileMutation({
        variables: {
          avatar: clourl,
        },
      })
      .then(this.setState({ loading1: false, valide1: true, avatar: clourl }));
  };

  onDrop2 = async ([file]) => {
    this.setState({ file, loading2: true });

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', config.CLOUDINARY.UPLOAD_PRESET);

    const response = await axios.post(config.CLOUDINARY.URL, formData);

    const clourl2 = await response.data.secure_url;

    // const { preview, name, type, size } = file;
    // const path = preview.substring(27);
    // console.log(path);

    await this.props
      .uploadFileMutation2({
        variables: {
          profil: clourl2,
        },
      })
      .then(this.setState({ loading2: false, valide2: true, profil: clourl2 }));
  };

  getGender = async event => {
    await this.setState({ statu: event.target.value });
  };

  auth = async () => {
    const {
      me: { email, firstname, secondname, business, about, statu, tell, tell2, avatar, profil },
    } = await this.props.meQuery;
    this.setState({ email, firstname, secondname, business, about, statu, tell, tell2, avatar, profil });
  };

  render() {
    const {
      firstname,
      firstnameError,
      secondname,
      secondnameError,
      email,
      emailError,
      about,
      aboutError,
      business,
      businessError,
      statu,
      statuError,
      tell,
      tellError,
      tell2,
      tell2Error,
      avatar,
      profil,
      loading1,
      loading2,
      valide2,
      valide1,
    } = this.state;

    const errorList = [];

    if (firstnameError) {
      errorList.push(firstnameError);
    }

    if (secondnameError) {
      errorList.push(secondnameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (statuError) {
      errorList.push(statuError);
    }

    if (businessError) {
      errorList.push(businessError);
    }

    if (aboutError) {
      errorList.push(aboutError);
    }

    if (tell2Error) {
      errorList.push(tell2Error);
    }

    if (tellError) {
      errorList.push(tellError);
    }

    const profilImages = donne => {
      if (loading2) {
        return (
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
        );
      } else if (valide2) {
        return <Image style={{ width: '100%', height: '100%' }} src={`${donne}`} />;
      } else if (donne) {
        return <Image style={{ width: '100%', height: '100%' }} src={`${donne}`} />;
      }
      return (
        <Image
          style={{ width: '100%', height: '100%' }}
          src="http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg"
        />
      );
    };

    const avatarImages = value => {
      if (loading1) {
        return (
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
        );
      } else if (valide1) {
        return <Image style={{ width: '100%', height: '100%' }} src={`${value}`} />;
      } else if (value) {
        return <Image style={{ width: '100%', height: '100%' }} src={`${value}`} />;
      }
      return <Image style={{ width: '100%', height: '100%' }} src="/afriqua.png" />;
    };

    return (
      <Container text>
        <Header as="h2">Updating</Header>
        <Form>
          <Form.Group widths={2}>
            <Form.Input
              error={!!secondnameError}
              label="Nom"
              name="secondname"
              onChange={this.onChange}
              value={secondname || ''}
              placeholder="Nom"
              fluid
            />
            <Form.Input
              error={!!firstnameError}
              label="Prenom"
              name="firstname"
              onChange={this.onChange}
              value={firstname || ''}
              placeholder="Premon"
              fluid
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input error={!!emailError} label="email" name="email" onChange={this.onChange} value={email || ''} placeholder="Email" fluid />
            <Form.Input error={!!tellError} label="telephone" name="tell" onChange={this.onChange} value={tell || ''} placeholder="91415452" fluid />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Field label="votres status" control="select" value={statu || ''} onChange={this.getGender} error={!!statuError}>
              <option style={{ fontSize: 20 }} value="client">
                Client
              </option>
              <option style={{ fontSize: 20 }} value="vendeur">
                Vendeur
              </option>
            </Form.Field>
          </Form.Group>
          {statu === 'vendeur' ? (
            <div>
              <Form.Group widths={2}>
                <Form.Input
                  error={!!businessError}
                  label="entreprise"
                  name="business"
                  onChange={this.onChange}
                  value={business || ''}
                  placeholder="nom de votre entreprise"
                  fluid
                />
                <Form.Input
                  error={!!tell2Error}
                  label="telephone entreprise"
                  name="tell2"
                  onChange={this.onChange}
                  value={tell2 || ''}
                  placeholder="(00225)"
                  fluid
                />
              </Form.Group>
              <Form.TextArea
                error={!!aboutError}
                control={TextArea}
                label="a propos de votre entreprise"
                onChange={this.onChange}
                name="about"
                value={about || ''}
                placeholder="Tell us more about you business"
              />
            </div>
          ) : (
            ''
          )}
        </Form>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Header as="h4">avatar</Header>
            <Dropzone onDrop={this.onDrop} style={{ height: '80%', border: 'dashed' }}>
              {avatarImages(avatar)}
            </Dropzone>
          </Grid.Column>
          <Grid.Column floated="right" width={11}>
            <Header as="h4">profil</Header>

            <Dropzone onDrop={this.onDrop2} style={{ height: '80%', border: 'dashed' }}>
              {profilImages(profil)}
            </Dropzone>
          </Grid.Column>
          <Grid.Row>
            <Button fluid onClick={this.onSubmit}>
              Valider
            </Button>
          </Grid.Row>
        </Grid>

        {firstnameError || secondnameError || emailError || tell2Error || tellError || aboutError || businessError || aboutError ? (
          <Message error header=" erreur verifier vos donner " list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const uploadFileMutation = gql`
  mutation($avatar: String!) {
    uploadFile(avatar: $avatar)
  }
`;

const uploadFileMutation2 = gql`
  mutation($profil: String!) {
    uploadFile2(profil: $profil)
  }
`;

export default compose(
  graphql(updateMutation, { name: 'updateMutation' }),
  graphql(meQuery, { name: 'meQuery' }),
  graphql(uploadFileMutation, { name: 'uploadFileMutation' }),
  graphql(uploadFileMutation2, { name: 'uploadFileMutation2' })
)(updating);
