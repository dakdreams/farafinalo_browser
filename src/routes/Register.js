import React from 'react';
import { Message, Button, Container, Header, Form, Segment, Responsive, Grid, Image } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { registerMutation } from '../graphql/queries';

const ForContaint = styled.div`
  position: absolute;
  top: 60%;
  left: 28%;
  z-index: 0;
  width: 50.6%;
  border: none;
`;

const MobyleForContaint = styled.div`
  position: absolute;
  top: 26%;
  left: 13%;
  z-index: 1;
  width: 75%;
  border: none;
`;

class Register extends React.Component {
  state = {
    isLoggedIn: false,
    firstname: '',
    firstnameError: '',
    secondname: '',
    secondnameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onSubmit = async () => {
    this.setState({
      firstnameError: '',
      secondnameError: '',
      emailError: '',
      passwordError: '',
    });

    const { firstname, secondname, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { firstname, secondname, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/login');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { firstname, firstnameError, secondname, secondnameError, email, emailError, password, passwordError } = this.state;

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

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <div style={{ backgroundColor: '#cccccc', height: '100%' }}>
            <Header textAlign="center" as="h4">
              Inscription
            </Header>
            <div>
              <Image src="/baobab.png" size="huge" />
            </div>
            <MobyleForContaint>
              <Form>
                <Form.Group unstackable widths={2}>
                  <Form.Input
                    error={!!secondnameError}
                    label="Nom"
                    name="secondname"
                    onChange={this.onChange}
                    value={secondname}
                    placeholder="Nom"
                    fluid
                  />
                  <Form.Input
                    error={!!firstnameError}
                    label="Prenom"
                    name="firstname"
                    onChange={this.onChange}
                    value={firstname}
                    placeholder="Premon"
                    fluid
                  />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Input
                    error={!!emailError}
                    label="email"
                    name="email"
                    onChange={this.onChange}
                    type="email"
                    value={email}
                    placeholder="Email"
                    fluid
                  />
                  <Form.Input
                    error={!!passwordError}
                    label="Mot de passe"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    type="password"
                    placeholder="Mot de passe"
                    fluid
                  />
                </Form.Group>
              </Form>
              <Button fluid style={{ marginTop: 10 }} onClick={this.onSubmit}>
                Valider
              </Button>
              {firstnameError || secondnameError || emailError || passwordError ? (
                <Message error header=" erreur verifier vos donner " list={errorList} />
              ) : null}
            </MobyleForContaint>
            <Message floating style={{ marginTop: 114 }}>
              <p style={{ fontSize: '20px', fontStyle: 'italic' }}>
                "je suis africain non pas parce que je suis né en afrique.
                <br />
                mais parce que l afrique est née en moi."
              </p>
              <div style={{ textAlign: 'right' }}>
                <a style={{ fontSize: '13px' }}>Kwame Nkrumah</a>
              </div>
            </Message>
            <Link to="/login">
              <Button color="brown" fluid>
                j ai deja un conpte
              </Button>
            </Link>
            <Link to="/">
              <Button color="green" fluid>
                Acceuille
              </Button>
            </Link>
          </div>
        </Responsive>
        <Responsive minWidth={768}>
          <Container fluid style={{ backgroundColor: '#cccccc', height: '100%' }}>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column width={6} style={{ height: '100%' }}>
                  <Message floating style={{ marginTop: '20%' }}>
                    <p style={{ fontSize: '40px', fontStyle: 'italic' }}>
                      "je suis africain non pas parce que je suis né en afrique.
                      <br />
                      mais parce que l afrique est née en moi."
                    </p>
                    <div style={{ textAlign: 'right' }}>
                      <a style={{ fontSize: '20px' }}>Kwame Nkrumah</a>
                    </div>
                  </Message>
                  <Link to="/login">
                    <Button color="brown" fluid>
                      j ai deja un conpte
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button color="green" fluid>
                      Acceuille
                    </Button>
                  </Link>
                </Grid.Column>
                <Grid.Column width={10} textAlign="center">
                  <Header as="h2">Inscription</Header>
                  <div>
                    <Image src="/baobab.png" alt="Logo" />
                  </div>
                  <ForContaint>
                    <Form>
                      <Form.Group unstackable widths={2}>
                        <Form.Input
                          error={!!secondnameError}
                          label="Nom"
                          name="secondname"
                          onChange={this.onChange}
                          value={secondname}
                          placeholder="Nom"
                          fluid
                        />
                        <Form.Input
                          error={!!firstnameError}
                          label="Prenom"
                          name="firstname"
                          onChange={this.onChange}
                          value={firstname}
                          placeholder="Premon"
                          fluid
                        />
                      </Form.Group>
                      <Form.Group widths={2}>
                        <Form.Input
                          error={!!emailError}
                          label="email"
                          name="email"
                          onChange={this.onChange}
                          value={email}
                          placeholder="Email"
                          fluid
                        />
                        <Form.Input
                          error={!!passwordError}
                          label="Mot de passe"
                          name="password"
                          onChange={this.onChange}
                          value={password}
                          type="password"
                          placeholder="Mot de passe"
                          fluid
                        />
                      </Form.Group>
                    </Form>
                    <Button fluid style={{ marginTop: 10 }} onClick={this.onSubmit}>
                      Valider
                    </Button>
                    {firstnameError || secondnameError || emailError || passwordError ? (
                      <Message error header=" erreur verifier vos donner " list={errorList} />
                    ) : null}
                  </ForContaint>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default graphql(registerMutation)(Register);
