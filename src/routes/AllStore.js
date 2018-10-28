import React from 'react';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Container, Segment, Responsive, Search } from 'semantic-ui-react';

import BigMenu from '../responsive/menu';
import StoreView from '../components/StoreView';
import { allStoreQuery } from '../graphql/queries';

const StoreSearch = styled.div`
  position: absolute;
  top: 2em;
  left: 2em;
  width: 100%;
  border: none;
`;

const StoreSearchMobile = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  border: none;
`;

const StoreSearchTablet = styled.div`
  position: fixed;
  top: 50px;
  width: 100%;
  border: none;
`;

class AllStore extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  render() {
    const { allStore = [] } = this.props.allStoreQuery;

    const { isLoading, value, results } = this.state;

    const searchValue = allStore.map(store => ({
      title: store.business,
      description: `${store.about.substr(0, 37).trim()} ...`,
      id: store.id,
      image: store.profil
        ? `${store.profil}`
        : 'http://www.lisapoyakama.org/wp-content/uploads/2016/08/AshantiToZulu_100-1024x484.jpg',
      // price: `${prod.prodprice} fcfa`,
    }));

    const handleResultSelect = async (e, { result }) => {
      await this.setState({ value: result.title });
      // await console.log(result.title);
      const storeId = await result.id;
      window.location.href = await `/store/${storeId}`;
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
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <Container style={{ backgroundColor: '#fcfcfc', width: 'auto', height: 'auto', position: 'absolute' }}>
            <BigMenu />
            <div style={{ marginTop: '5em' }}>
              <StoreSearchMobile>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <Search
                      loading={isLoading}
                      onResultSelect={handleResultSelect}
                      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                      results={results}
                      value={value}
                      placeholder="Store..."
                      size="mini"
                      {...this.props}
                    />
                  </Grid.Column>
                  <Grid.Column floated="right" width={8} style={{ textAlign: 'center' }}>
                    store
                  </Grid.Column>
                </Grid>
              </StoreSearchMobile>

              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                  {allStore.map(store => (
                    <Grid.Column key={store.id}>
                      <StoreView
                        storeId={store.id}
                        storeName={store.business}
                        storeFirstName={store.firstname}
                        storeSecondName={store.secondname}
                        storeAvatar={store.avatar}
                        storeProfil={store.profil}
                        storeAbout={store.about}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </div>
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Container style={{ backgroundColor: '#fcfcfc', width: 'auto', height: 'auto', position: 'absolute' }}>
            <BigMenu />
            <div style={{ marginTop: '6em' }}>
              <StoreSearchTablet>
                <Grid>
                  <Grid.Column floated="left" textAlign='left' width={14}>
                    <Search
                      loading={isLoading}
                      onResultSelect={handleResultSelect}
                      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                      results={results}
                      value={value}
                      size="mini"
                      placeholder="Store..."
                      {...this.props}
                    />
                  </Grid.Column>
                </Grid>
              </StoreSearchTablet>

              <Grid divided="vertically">
                <Grid.Row columns={3}>
                  {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                  {allStore.map(store => (
                    <Grid.Column key={store.id}>
                      <StoreView
                        storeId={store.id}
                        storeName={store.business}
                        storeFirstName={store.firstname}
                        storeSecondName={store.secondname}
                        storeAvatar={store.avatar}
                        storeProfil={store.profil}
                        storeAbout={store.about}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </div>
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <div style={{ backgroundColor: '#ffff' }}>
            <BigMenu />
            <div style={{ marginTop: '3em' }}>
              <Grid columns="equal">
                <Grid.Column>
                  <StoreSearch>
                    <Search
                      loading={isLoading}
                      onResultSelect={handleResultSelect}
                      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                      results={results}
                      value={value}
                      placeholder="Store..."
                      size="tiny"
                      {...this.props}
                    />
                  </StoreSearch>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid divided="vertically">
                    <Grid.Row columns={4}>
                      {/* <div>{ product.map(prod => (prod.prodimages)) }</div> */}
                      {allStore.map(store => (
                        <Grid.Column key={store.id}>
                          <StoreView
                            storeId={store.id}
                            storeName={store.business}
                            storeFirstName={store.firstname}
                            storeSecondName={store.secondname}
                            storeAvatar={store.avatar}
                            storeProfil={store.profil}
                            storeAbout={store.about}
                          />
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default compose(graphql(allStoreQuery, { name: 'allStoreQuery' }))(AllStore);
