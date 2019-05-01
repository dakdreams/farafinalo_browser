import React from 'react';
import { Card, Image, Grid, Rating, Responsive, Label } from 'semantic-ui-react';

class HomeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      url: props.imagelink,
      name: props.prodName,
      description: props.proDescription,
      price: props.prodPrice,
    };
  }

  render() {
    return (
      <a href={`/product/${this.state.name}/${this.state.prodid}`}>
        <Responsive {...Responsive.onlyTablet}>
          <div>
            <Label size='mini' style={{ position: 'absolute', zIndex: 1, top: '1%', left: '51%' }} as="a" color="red" tag>
              {this.state.price} Fcfa
            </Label>
            <Image style={{ height: 170 }} fluid src={this.state.url} />
          </div>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <Card link key={this.state.prodid}>
            <Image style={{ height: '206.453px' }} src={this.state.url} />
            <Card.Content extra>
              <Grid>
                <Grid.Column floated="left" width={8}>
                  <h3>{this.state.price} Fcfa</h3>
                </Grid.Column>
                <Grid.Column floated="right" width={8}>
                  <Rating icon="star" defaultRating={3} maxRating={5} disabled />
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </Responsive>
      </a>
    );
  }
}

export default HomeProduct;
