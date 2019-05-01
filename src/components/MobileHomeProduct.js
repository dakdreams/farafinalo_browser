import React from 'react';
import { Card, Image, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MobileHomeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      url: props.imagelink,
      name: props.prodName,
      description: props.proDescription,
      price: props.prodPrice,
      owner: props.owner,
    };
  }

  render() {
    return (
      <Link to={`/product/${this.state.prodid}`}>
        <Card key={this.state.prodid} href={'#'}>
          <Image style={{ height: '150.453px' }} src={this.state.url} />
          <Card.Content extra>
            <Grid.Row>
              {this.state.owner ? (
                <div>
                  <Grid.Column floated="left" width={14}>
                    <h5 style={{ fontSize: 'x-smaller' }}>{this.state.price} Fcfa</h5>
                  </Grid.Column>

                  <Grid.Column floated="right" width={2}>
                    <Link to={`/addproduct?id=${this.state.prodid}`}>
                      <Icon name="settings" />
                    </Link>
                  </Grid.Column>
                </div>
              ) : (
                <div>
                  <Grid.Column floated="left" width={14}>
                    <h5 style={{ fontSize: 'x-smaller' }}>{this.state.price} Fcfa</h5>
                  </Grid.Column>

                  <Grid.Column floated="right" width={2}>
                    <Icon name="users" />
                  </Grid.Column>
                </div>
              )}
            </Grid.Row>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

export default MobileHomeProduct;
