import React from 'react';
import { Header, Button, Dropdown, Grid, Message } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Abobo', value: 'Abobo' },
  { key: 2, text: 'Adjame', value: 'Adjame' },
  { key: 3, text: 'Attecoube', value: 'Attecoube' },
  { key: 4, text: 'Anyama', value: 'Anyama' },
  { key: 5, text: 'Bingerville', value: 'Bingerville' },
  { key: 6, text: 'Cocody', value: 'Cocody' },
  { key: 7, text: 'Le Plateau', value: 'Le Plateau' },
  { key: 8, text: 'Yopougon', value: 'Yopougon' },
  { key: 9, text: 'Treichville', value: 'Treichville' },
  { key: 10, text: 'Koumassi', value: 'Koumassi' },
  { key: 11, text: 'Marcory', value: 'Marcory' },
  { key: 12, text: 'Port-Bouet', value: 'Port-Bouet' },
  { key: 13, text: 'Songon', value: 'Songon' },
];

class MobileTableau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: this.props.cat,
      transport: this.props.trans,
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    if (this.state.cat === 'meuble') {
      if (['Adjame', 'Le Plateau', 'Treichville'].includes(value)) {
        this.setState({ transport: 5000 });
      } else {
        this.setState({ transport: 8000 });
      }
    } else if (['Adjame', 'Le Plateau', 'Treichville'].includes(value)) {
      this.setState({ transport: 2000 });
    } else {
      this.setState({ transport: 2500 });
    }
  };

  render() {
    const { value, transport } = this.state;
    const TransView = () => (
      <div>
        {/* {transport === 'a votre charge' ? : } */}
        <Grid>
          <Grid.Column>
            <Dropdown onChange={this.handleChange} options={options} placeholder="choisire votre commune" selection value={value} />
          </Grid.Column>
          {/* <Grid.Column>
            <Message
              icon="car"
              header="Vous pouver tranporter vous meme ou nous nous chargerons de cela"
              content="Pour avoir votre frais de transport veiller selectioner votre commune"
            />
          </Grid.Column> */}
        </Grid>

        {value ? (
          <Grid style={{ marginBottom: 20 }}>
            <Header as="h2" style={{ marginLeft: '25%' }}>
              {value}
            </Header>
            <Grid.Row>
              <Grid.Column width={8}>Frais de transport</Grid.Column>
              <Grid.Column width={8}>{transport} fcfa</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>Delais de livraison</Grid.Column>
              <Grid.Column width={8}>72h</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>procedure de payment</Grid.Column>
              <Grid.Column width={8}>catch a la livraison</Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Button style={{ marginLeft: '12%' }} positive>commender des maintement</Button>
            </Grid.Row>
          </Grid>
        ) : (
          <Grid style={{ marginBottom: 20 }}>
            <Grid.Column>
              <Message
                icon="car"
                header="Vous pouver tranporter vous meme ou nous nous chargerons de cela"
                content="Pour avoir votre frais de transport veiller selectioner votre commune"
              />
            </Grid.Column>
          </Grid>
        )}
      </div>
    );

    const Zview = () => (
      <div style={{ marginBottom: 20, fontSize: 'smaller' }}>
        <Message
          color='green'
          header="le transport GRATUIT"
          list={['le vendeur decide de vous offrire le transport si vous etre dans la ville d Abidjan']}
        />
        <Message
          color='green'
          header="Option de payment"
          list={['payer catch a la livraison apres verification du produit', 'ou via le mobile banking']}
        />
      </div>
    );
    return (
      <div>
        {transport === 'a votre charge' ? <Zview /> : <TransView />}
      </div>
    );
  }
}

export default MobileTableau;
