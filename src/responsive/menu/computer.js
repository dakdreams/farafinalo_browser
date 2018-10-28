import React from 'react';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import { Dropdown, Icon, Button, Grid, Search, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { allProductQuery, meQuery } from '../../graphql/queries';

// TODO: Update <Search> usage after its will be implemented

// const Search = () => (
//   <Input icon={<Icon name="search" inverted circular link />} placeholder="recherche..." />
// );

class MenuExampleAttached extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  render() {
    const { me = [] } = this.props.mequery;
    const { firstname, business } = me;
    const { isLoading, value, results } = this.state;
    const { allProduct = [] } = this.props.allproductquery;
    const { products = [] } = allProduct;

    const ConnectLogin = () => (
      <Button.Group>
        <Link to="/">
          <Button color="teal"> Accueille </Button>
        </Link>
        {business ? (
          <Link to="/addproduct">
            <Button>+ Ajouter produit</Button>
          </Link>
        ) : (
          <Modal trigger={<Button>+ Ajouter Produit</Button>} closeIcon>
            <Header icon="settings" content="hummmm!" />
            <Modal.Content>
              <p>desoler vous ne posseder pas de store pour le moment veullier modifier votre status dans vos profil</p>
            </Modal.Content>
            <Modal.Actions>
              <Link to="/profil">
                <Button color="green">
                  <Icon name="checkmark" /> Yes
                </Button>
              </Link>
            </Modal.Actions>
          </Modal>
        )}
      </Button.Group>
    );

    const Login = () => (
      <Button.Group>
        <Link to="/register">
          <Button positive>inscription</Button>
        </Link>
        <Button.Or text="ou" />
        <Link to="/login">
          <Button>connection</Button>
        </Link>
      </Button.Group>
    );

    const Drop = () => (
      <Dropdown button text="Farafinalo" style={{ backgroundColor: '#F7DD05' }} simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="dropdown" />
            <span className="text">Cathegory</span>

            <Dropdown.Menu>
              <Dropdown.Item>Mode</Dropdown.Item>
              <Dropdown.Item>Mobilier</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/">Accueille</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/allstore">Magasin</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            {firstname ? (
              <Modal trigger={<Button>Ajouter Produit</Button>} closeIcon>
                <Header icon="settings" content="Archive Old Messages" />
                <Modal.Content>
                  <p>desoler vous ne posseder pas de store pour le moment veullier modifier votre status dans vos profil</p>
                </Modal.Content>
                <Modal.Actions>
                  <Link to="/profil">
                    <Button color="green">
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Link>
                </Modal.Actions>
              </Modal>
            ) : (
              <Link to="/login">Cree votre magasin</Link>
            )}
          </Dropdown.Item>
          <Dropdown.Item>{firstname ? <Link to="/profil">Profil</Link> : <Link to="/login">profil</Link>}</Dropdown.Item>
          <Dropdown.Divider />
          {/* <Dropdown.Header>Export</Dropdown.Header> */}
          <Dropdown.Item>Apropos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    const Dropcustonner = () => (
      <Dropdown button text="Farafinalo" style={{ backgroundColor: '#F7DD05' }} simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="dropdown" />
            <span className="text">Cathegory</span>

            <Dropdown.Menu>
              <Dropdown.Item>Mode</Dropdown.Item>
              <Dropdown.Item>Mobilier</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/">Accueille</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/allstore">Store</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/addproduct">Ajouter Produit</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/profil">Profil</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          {/* <Dropdown.Header>Export</Dropdown.Header> */}
          <Dropdown.Item>Apropos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    // const searchValue = () => {
    //   products.map(prod => ({
    //     title: prod.prodname,
    //     description: prod.prodescription,
    //     image: prod.prodimages[0],
    //     price: prod.prodprice,
    //   }));
    // };

    const searchValue = products.map(prod => ({
      title: prod.prodname,
      cathegory: prod.prodcathegory,
      description: `${prod.prodescription.substr(0, 40).trim()} ...`,
      image: prod.prodimages[0],
      price: `${prod.prodprice} fcfa`,
    }));

    const handleResultSelect = async (e, { result }) => {
      await this.setState({ value: result.title });
      // await console.log(result.title);
      const cat = await result.cathegory;
      window.location.href = await `/product/cathegory/${cat}`;
    };
    // eslint-disable-next-line no-shadow
    const handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value });

      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = result => re.test(result.title);

        this.setState({
          isLoading: false,
          results: _.filter(searchValue, isMatch),
        });
      }, 300);
    };

    return (
      <div style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%', backgroundColor: '#E0E0E0' }}>
        <Grid columns="equal">
          <Grid.Column textAlign="left" width={6}>
            {business ? <Dropcustonner /> : <Drop />}
          </Grid.Column>
          <Grid.Column textAlign="center" width={4}>
            <Grid>
              <Grid.Column textcontant="center" width={15}>
                <Search
                  loading={isLoading}
                  onResultSelect={handleResultSelect}
                  onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                  results={results}
                  value={value}
                  size="tiny"
                  placeholder="produit.."
                  {...this.props}
                />
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column textAlign="right">{firstname ? <ConnectLogin /> : <Login />}</Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default compose(
  graphql(allProductQuery, { name: 'allproductquery' }),
  graphql(meQuery, { name: 'mequery' })
)(MenuExampleAttached);
