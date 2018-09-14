import React from 'react';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import { Dropdown, Icon, Button, Grid, Popup, Search, Image, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import config from '../../config';
import { allProductQuery, meQuery } from '../../graphql/queries';

// const Search = () => (
//   <Input icon={<Icon name="search" inverted circular link />} size="mini" placeholder="recherche..." />
// );

const LoginButon = () => (
  <Popup
    trigger={<Icon name="user circle" size="large" />}
    content={
      <Button.Group size="mini">
        <Link to="/register">
          <Button>inscription</Button>
        </Link>
        <Button.Or text="ou" />
        <Link to="/login">
          <Button positive>connection</Button>
        </Link>
      </Button.Group>
    }
    on="click"
    position="bottom right"
    size="mini"
  />
);

class MenuMobile extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });
  render() {
    const { me = [] } = this.props.mequery;
    const { firstname, avatar, business } = me;
    const { isLoading, value, results } = this.state;
    const { allProduct = [] } = this.props.allproductquery;
    const { products = [] } = allProduct;

    const Drop = () => (
      <Dropdown item icon="sidebar" simple>
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

    const DropCustomer = () => (
      <Dropdown item icon="sidebar" simple>
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
            <Link to="/allstore">Magasins</Link>
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

    const searchValue = products.map(prod => ({
      title: prod.prodname,
      cathegory: prod.prodcathegory,
      description: `${prod.prodescription.substr(0, 40).trim()} ...`,
      image: prod.prodimages[0],
      price: `${prod.prodprice} fcfa`,
    }));

    const handleResultSelect = async (e, { result }) => {
      await this.setState({ value: result.title });
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
      <Grid columns="equal" style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%', backgroundColor: '#E0E0E0' }}>
        <Grid.Column textAlign="left" style={{ paddingBottom: 0 }} width={3}>
          {business ? <DropCustomer /> : <Drop />}
        </Grid.Column>
        <Grid.Column textAlign="center" style={{ paddingBottom: 0 }} width={10}>
          <Grid>
            <Grid.Column width={15}>
              <Grid>
                <Grid.Column width={15}>
                  <Search
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    size="mini"
                    placeholder="produit.."
                    {...this.props}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column textAlign="right" style={{ paddingBottom: 0, paddingRight: 13 }}>
          {firstname ? (
            <Popup
              trigger={
                <Image
                  floated="right"
                  style={{ width: '30px', height: '30px' }}
                  circular
                  size="medium"
                  src={avatar ? `http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${avatar}` : '/afriqua.png'}
                />
              }
              content={
                <Button.Group size="mini">
                  <Link to="/profil">
                    <Button>mon profil</Button>
                  </Link>
                  <Button.Or text="ou" />

                  {business ? (
                    <Link to="/addproduct">
                      <Button positive>ajout produit</Button>
                    </Link>
                  ) : (
                    <Link to="/profil">
                      <Button positive>cree store</Button>
                    </Link>
                  )}
                </Button.Group>
              }
              on="click"
              position="bottom right"
              size="mini"
            />
          ) : (
            // <Image
            //   style={{ width: '30px', height: '30px' }}
            //   circular
            //   size="medium"
            //   src={
            //     avatar
            //       ? `http://res.cloudinary.com/${config.CLOUDINARY.NAME}/image/upload/${avatar}`
            //       : '/afriqua.png'
            //   }
            // />
            <LoginButon />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  graphql(allProductQuery, { name: 'allproductquery' }),
  graphql(meQuery, { name: 'mequery' })
)(MenuMobile);
