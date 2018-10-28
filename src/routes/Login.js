import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Form, Header, Message, Button, Grid, Image, Responsive, Dimmer, Loader, Divider, Segment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { loginMutation } from '../graphql/queries';
import FaceBookConnect from '../components/facebookConnect';
import GoogleConnect from '../components/googleConnect';

const ForContaint = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  z-index: 0;
  width: 60%;
  border: none;
`;

const MobyleForContaint = styled.div`
  position: absolute;
  top: 20%;
  left: 13%;
  z-index: 0;
  width: 70%;
  border: none;
`;
class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
      active: false,
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/';
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  Validation = () => {
    this.active = true;
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError },
      active,
    } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          {active ? (
            <div style={{ height: '100%' }}>
              <Dimmer active={active}>
                <Loader indeterminate>chargement...</Loader>
              </Dimmer>

              <Image src="/images/wireframe/short-paragraph.png" />
            </div>
          ) : (
            ''
          )}
          <div style={{ height: '100%' }}>
            <Header textAlign="center" as="h2">
              Connecter vous
            </Header>
            <div>
              <Image src="https://www.goafricaonline.com/images/drapeaux/afrique.png" size="huge" />
            </div>

            <MobyleForContaint>
              <div padded>
                <Button.Group>
                  <Button color="black" onClick={this.Validation} style={{ padding: 2 }}>
                    <FaceBookConnect />
                  </Button>
                  <Button.Or text="ou" />
                  <Button color="black" onClick={this.Validation} style={{ padding: 2 }}>
                    <GoogleConnect />
                  </Button>
                </Button.Group>
                <Divider horizontal>Or</Divider>
                <Form size="mini">
                  <Form.Group unstackable widths={2}>
                    <Form.Input error={!!emailError} name="email" onChange={this.onChange} type="email" value={email} placeholder="Email" />
                    <Form.Input
                      error={!!passwordError}
                      name="password"
                      onChange={this.onChange}
                      value={password}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                </Form>
                <Button fluid style={{ marginTop: 10 }} onClick={this.onSubmit}>
                  Valider
                </Button>
                {errorList.length ? <Message error header="erreur" list={errorList} /> : null}
              </div>
            </MobyleForContaint>
            <Message floating>
              <p style={{ fontSize: '20px', fontStyle: 'italic' }}>"Produisons ce que nous consommons et consommons ce que nous produisons."</p>
              <div style={{ textAlign: 'right' }}>
                <a style={{ fontSize: '13px' }}>Thomas Songara</a>
              </div>
            </Message>
            <Link to="/register">
              <Button color="blue" fluid>
                Inscriver vous
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
          <div style={{ height: '100%' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} style={{ height: '100%' }}>
                  <Message floating style={{ marginTop: '20%' }}>
                    <p style={{ fontSize: '40px', fontStyle: 'italic' }}>"Produisons ce que nous consommons et consommons ce que nous produisons."</p>
                    <div style={{ textAlign: 'right' }}>
                      <a style={{ fontSize: '20px' }}>Thomas Songara</a>
                    </div>
                  </Message>
                  <Link to="/register">
                    <Button color="blue" fluid>
                      inscriver vous
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button color="green" fluid>
                      Acceuille
                    </Button>
                  </Link>
                </Grid.Column>
                <Grid.Column width={8} textAlign="center">
                  <Header as="h1">Connecter vous</Header>
                  <div>
                    <Image src="/afriqua.png" size="huge" />
                  </div>
                  <ForContaint>
                    <Segment padded>
                      <Grid columns="equal">
                        <Grid.Column floated="left">
                          <FaceBookConnect />
                        </Grid.Column>
                        <Grid.Column floated="right">
                          <GoogleConnect />
                        </Grid.Column>
                      </Grid>
                      <Divider horizontal>Ou</Divider>
                      <div>
                        <Form>
                          <Form.Group unstackable widths={2}>
                            <Form.Input error={!!emailError} name="email" type="email" onChange={this.onChange} value={email} placeholder="Email" />
                            <Form.Input
                              error={!!passwordError}
                              name="password"
                              onChange={this.onChange}
                              value={password}
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Group>
                        </Form>
                        <Button fluid style={{ marginTop: 10 }} onClick={this.onSubmit}>
                          Valider
                        </Button>
                        {errorList.length ? <Message error header="There was some errors with your submission" list={errorList} /> : null}
                      </div>
                    </Segment>
                  </ForContaint>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Responsive>
      </div>
    );
  }
}

export default graphql(loginMutation)(observer(Login));
