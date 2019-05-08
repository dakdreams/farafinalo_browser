import React from 'react';
import { Image, Button, Reveal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// const CLOUD_NAME = 'dg6zkrdqu';

class HomeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFristname: props.firstname,
      userAvatar: props.avatar,
    };
  }

  render() {
    const Login = () => (
      <div>
        {this.state.userFristname ? (
          <div>
            <h4>bienvenu {this.state.userFristname}</h4>
            <Reveal style={{ zIndex: 0 }} animated="rotate">
              <Reveal.Content visible>
                <Image
                  style={{ width: '230px', height: '230px', marginLeft: '8%' }}
                  src="https://assets2.jiveon.com/core/2016.3.9.0.b96715f/images/jive-avatar-disabled.png"
                  size="medium"
                  circular
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                {this.state.userAvatar ? (
                  <Image
                    style={{ width: '224px', height: '224px', marginLeft: '8%' }}
                    circular
                    size="medium"
                    src={`${this.state.userAvatar}`}
                  />
                ) : (
                  <Image
                    style={{ width: '224px', height: '224px', marginLeft: '8%' }}
                    circular
                    size="medium"
                    src='/afriqua.png'
                  />
                )}
              </Reveal.Content>
            </Reveal>
            <div style={{ marginTop: 10 }}>
              <Link to="/profil">
                <Button fluid>Mon profil</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h4>Farafinalo</h4>
            <Image
              style={{ width: '230px', height: '230px', marginLeft: '8%' }}
              src="https://assets2.jiveon.com/core/2016.3.9.0.b96715f/images/jive-avatar-disabled.png"
              size="medium"
              circular
            />
            <div>
              <Button.Group>
                <Link to="/register">
                  <Button>Inscription</Button>
                </Link>
                <Button.Or text="ou" />
                <Link to="/login">
                  <Button color="green">Connection</Button>
                </Link>
              </Button.Group>
            </div>
          </div>
        )}
      </div>
    );
    return <Login />;
  }
}

export default HomeLogin;
