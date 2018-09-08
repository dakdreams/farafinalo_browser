import React from 'react';
import { Header, Table, Dropdown, Grid, Message } from 'semantic-ui-react';

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

class tableau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: this.props.cat,
      trans: this.props.trans,
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    console.log(this.state.cat);
    console.log(this.state.cat);
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
    const { value, trans, transport } = this.state;
    const TransView = () => (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <Dropdown onChange={this.handleChange} options={options} placeholder="choisire votre commune" selection value={value} />
          </Grid.Column>
          <Grid.Column>
            <Message
              icon="car"
              header="Vous pouver tranporter vous meme ou nous nous chargerons de cela"
              content="Pour avoir votre frais de transport veiller selectioner votre commune"
            />
          </Grid.Column>
        </Grid>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Commune</Table.HeaderCell>
              <Table.HeaderCell>Frais de transport(fcfa)</Table.HeaderCell>
              <Table.HeaderCell>delais de livraison</Table.HeaderCell>
              <Table.HeaderCell>Consensus</Table.HeaderCell>
              <Table.HeaderCell>Procedure de payment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {value ? (
              <Table.Row>
                <Table.Cell>
                  <Header as="h2" textAlign="center">
                    {value}
                  </Header>
                </Table.Cell>
                <Table.Cell singleLine>{transport}</Table.Cell>
                <Table.Cell>24h</Table.Cell>
                <Table.Cell textAlign="right">
                  100% <br />
                </Table.Cell>
                <Table.Cell>
                  vous payer CATSH a la livraison apres verification de l autentisiter du produit ou via mobile bank:<br />{' '}
                  <img alt="" style={{ width: 50, height: 50 }} src="https://img6.downloadapk.net/6/fe/ba29b7_0.png" />
                  <img alt="" style={{ width: 50, height: 50 }} src="http://gtw-solutions.com/wp-content/uploads/2015/01/mtn-mobile-money.jpg" />
                  <img alt="" style={{ width: 50, height: 50 }} src="http://emoney-ci.biz/wp-content/uploads/2017/02/moov-money.png" />
                </Table.Cell>
              </Table.Row>
            ) : (
              ''
            )}
            <Table.Row>
              <Table.Cell>
                <Header as="h2" textAlign="center">
                  standar
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{this.state.cat === 'meuble' ? '9000' : '3000'}</Table.Cell>
              <Table.Cell>72h</Table.Cell>
              <Table.Cell textAlign="right">
                80% <br />
              </Table.Cell>
              <Table.Cell>vous payer a la livraison apres verification de l autentisiter du produit</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
    const Zview = () => (
      <div style={{ marginBottom: 20 }}>
        <Message
          color="green"
          header="le transport GRATUIT"
          list={['le vendeur decide de vous offrire le transport si vous etre dans la ville d Abidjan']}
        />
        <Message
          color="green"
          header="Option de payment"
          list={['payer catch a la livraison apres verification du produit', 'ou via le mobile banking']}
        />
      </div>
    );
    return <div>{trans === 'a votre charge' ? <Zview /> : <TransView />}</div>;
  }
}

export default tableau;
