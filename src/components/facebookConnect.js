import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { graphql, compose } from 'react-apollo';
import { Icon } from 'semantic-ui-react';

import './style.css';
import { registerMutation, loginMutation } from '../graphql/queries';

class FacebookConnect extends React.Component {
  state = {};

  responseFacebook = async response => {
    const allname = await response.name.split(' ');
    const secondname = await allname.pop();
    const firstname = await allname.join(' ');
    const email = await response.email;
    const password = await response.id;
    const avatar = await response.picture.data.url;
    // console.log(secondname);
    console.log(response);
    console.log(avatar);

    const response1 = await this.props.loginMutation({
      variables: { email, password },
    });

    const { ok, token, refreshToken } = await response1.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/';
    } else {
      await this.props.registerMutation({
        variables: { firstname, secondname, email, password, avatar },
      });

      const response2 = await this.props.loginMutation({
        variables: { email, password },
      });

      /* eslint-disable no-shadow */

      const { token, refreshToken } = await response2.data.login;

      await localStorage.setItem('token', token);
      await localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/';
    }

    // this.setState({
    //   isLoggedIn: true,
    //   firstname: response.name,
    //   email: response.email,
    //   picture: response.picture.data.url,
    // });

    // const { firstname, secondname, email, password } = this.state;
    // const response2 = await this.props.mutate({
    //   variables: { firstname, secondname, email, password },
    // });

    // const { ok, errors } = response2.data.register;

    // if (ok) {
    //   this.props.history.push('/login');
    // } else {
    //   const err = {};
    //   errors.forEach(({ path, message }) => {
    //     // err['passwordError'] = 'too long..';
    //     err[`${path}Error`] = message;
    //   });

    //   this.setState(err);
    // }
  };

  render() {
    const fbContent = (
      <FacebookLogin
        appId="292795687987735"
        autoLoad
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
        textButton="connection"
        icon={<Icon name="facebook f" />}
        cssClass="btnFacebook"
        // cssClass={{ width: '100px', height: '100px', color: 'red' }}
      />
    );
    return <div>{fbContent}</div>;
  }
}

export default compose(
  graphql(loginMutation, { name: 'loginMutation' }),
  graphql(registerMutation, { name: 'registerMutation' })
)(FacebookConnect);
