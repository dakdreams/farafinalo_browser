import React from 'react';
import GoogleLogin from 'react-google-login';
import { graphql, compose } from 'react-apollo';
import { Icon } from 'semantic-ui-react';

import './style.css';
import { registerMutation, loginMutation } from '../graphql/queries';

class GoogleConnect extends React.Component {
  state = {};

  responseGoogle = async response => {
    const secondname = await response.profileObj.familyName;
    const firstname = await response.profileObj.givenName;
    const email = await response.profileObj.email;
    const password = await response.googleId;
    const avatar = await response.profileObj.imageUrl;
    
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
  };

  render() {
    const GoogleContent = (
      <GoogleLogin
        clientId="625734482369-ldaienbb8boe88152e864mljs2rpiuik.apps.googleusercontent.com"
        buttonText="connection Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        className="btnGoogle"
      >
        <span>
          <Icon
            style={{
              marginLeft: '5px',
            }}
            name="google"
          />
          connection
        </span>
      </GoogleLogin>

      // style={{ width: '100px', height: '100px', color: 'red' }}
    );
    return <div>{GoogleContent}</div>;
  }
}

export default compose(
  graphql(loginMutation, { name: 'loginMutation' }),
  graphql(registerMutation, { name: 'registerMutation' })
)(GoogleConnect);
