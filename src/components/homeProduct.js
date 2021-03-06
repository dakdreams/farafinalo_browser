import React from 'react';
import { Card, Image, Grid, Flag, Responsive, Label } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

class HomeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      url: props.imagelink,
      mainUrl: props.mainImagesLink,
      name: props.prodName,
      description: props.proDescription,
      price: props.prodPrice,
      cath: props.prodcath,
    };
  }

  render() {
    const { mainUrl, url } = this.state;
    // pour ameliore le referencement
    const produitName = this.state.name.trim();
    const ProduitName = produitName.replace(/ /g, '-');

    const produitCath = this.state.cath.trim();
    const ProduitCath = produitCath.replace(/ /g, '-');
    return (
      <a href={`/product/${ProduitCath}/${ProduitName}/${this.state.prodid}`}>
        <Responsive {...Responsive.onlyTablet}>
          <Card raised link key={this.state.prodid}>
            <Label size="mini" style={{ position: 'absolute', zIndex: 1, top: '1%', left: '51%', fontWeight: '900px' }} as="a" tag>
              <NumberFormat value={this.state.price} displayType={'text'} thousandSeparator=" " suffix={' Fcfa'} />
            </Label>
            <Flag name="ci" style={{ position: 'absolute', zIndex: 1, top: '1%', left: '1%' }} />
            <Image style={{ height: '180px' }} fluid src={this.state.url} />
          </Card>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <Card raised link key={this.state.prodid}>
            <Image style={{ height: '206.453px' }} src={mainUrl || url} />
            <Card.Content style={{ fontWeight: 1000 }} extra>
              <Grid>
                <Grid.Column floated="left" width={12}>
                  <NumberFormat value={this.state.price} displayType={'text'} thousandSeparator=" " suffix={' Fcfa'} />
                  {/* <h3>{this.state.price} Fcfa</h3> */}
                </Grid.Column>
                <Grid.Column floated="right" width={4}>
                  <Flag name="ci" />
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
