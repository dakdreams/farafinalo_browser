import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Form, Header, Message, Button, Grid, Image, Responsive } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { loginMutation } from '../graphql/queries';

const ForContaint = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  z-index: 0;
  width: 50.6%;
  border: none;
`;

const MobyleForContaint = styled.div`
  position: absolute;
  top: 26%;
  left: 13%;
  z-index: 0;
  width: 60.6%;
  border: none;
`;
class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
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

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError },
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
          <div style={{ height: '100%' }}>
            <Header textAlign="center" as="h2">
              Connecter vous
            </Header>
            <div>
              <Image src="https://www.goafricaonline.com/images/drapeaux/afrique.png" size="huge" />
            </div>
            <MobyleForContaint>
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
