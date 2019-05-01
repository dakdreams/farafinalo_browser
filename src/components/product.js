import React from 'react';
import { Card, Icon, Image, Grid, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CardExampleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      url: props.imagelink,
      name: props.prodName,
      description: props.proDescription,
      price: props.prodPrice,
      noOwner: props.noOwner,
    };
  }

  render() {
    const text = this.state.description.substring(0, 72);
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
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
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Link key={this.state.prodid} to={`/product/${this.state.name}/${this.state.prodid}`}>
            <Card link key={this.state.prodid}>
              <Image style={{ height: '180.453px' }} src={this.state.url} />
              <Card.Content>
                <Card.Header>{this.state.name}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>{text}...</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <p>{this.state.price} Fcfa</p>
                  </Grid.Column>
                  <Grid.Column floated="right" width={8}>
                    {this.state.noOwner ? (
                      ''
                    ) : (
                      <Link to={`/addproduct?id=${this.state.prodid}`}>
                        <Icon name="settings" />
                        modifier
                      </Link>
                    )}
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Link>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <Link key={this.state.prodid} to={`/product/${this.state.name}/${this.state.prodid}`}>
            <Card link key={this.state.prodid}>
              <Image style={{ height: '205.453px' }} src={this.state.url} />
              <Card.Content>
                <Card.Header>{this.state.name}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>{text}...</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <p>{this.state.price} Fcfa</p>
                  </Grid.Column>
                  <Grid.Column floated="right" width={8}>
                    {this.state.noOwner ? (
                      ''
                    ) : (
                      <Link to={`/addproduct?id=${this.state.prodid}`}>
                        <Icon name="settings" />
                        modifier
                      </Link>
                    )}
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Link>
        </Responsive>
      </div>
    );
  }
}

export default CardExampleCard;
