import React from 'react';
import { Card, Image, Grid, Icon, Flag } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

class MobileHomeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      url: props.imagelink,
      mainUrl: props.mainImagesLink,
      name: props.prodName,
      description: props.proDescription,
      price: props.prodPrice,
      owner: props.owner,
      cath: props.prodcath,
    };
  }

  render() {
    const { mainUrl, url } = this.state;
    const produitName = this.state.name.trim();
    const ProduitName = produitName.replace(/ /g, '-');

    const produitCath = this.state.cath.trim();
    const ProduitCath = produitCath.replace(/ /g, '-');

    return (
      <Link to={`/product/${ProduitCath}/${ProduitName}/${this.state.prodid}`}>
        <Card raised key={this.state.prodid} href={'#'}>
          <Image style={{ height: '150.453px' }} src={mainUrl || url} />
          <Card.Content style={{ fontWeight: 1000, borderWidth: 0 }} extra>
            <Grid.Row>
              {this.state.owner ? (
                <div>
                  <Grid.Column floated="left" width={14}>
                    <NumberFormat
                      style={{ fontSize: 'x-smaller' }}
                      value={this.state.price}
                      displayType={'text'}
                      thousandSeparator=" "
                      suffix={' Fcfa'}
                    />
                    {/* <h5 style={{ fontSize: 'x-smaller' }}>{this.state.price} Fcfa</h5> */}
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
                    <NumberFormat
                      style={{ fontSize: 'x-smaller' }}
                      value={this.state.price}
                      displayType={'text'}
                      thousandSeparator=" "
                      suffix={' Fcfa'}
                    />
                    {/* <h5 style={{ fontSize: 'x-smaller' }}>{this.state.price} Fcfa</h5> */}
                  </Grid.Column>

                  <Grid.Column floated="right" width={2}>
                    <Flag name="ci" />
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
