import React from 'react';
import { Card, Image, Responsive, Segment } from 'semantic-ui-react';

class StoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: props.storeId,
      storeName: props.storeName,
      storeFirstName: props.storeFirstName,
      storeSecondName: props.storeSecondName,
      storeAvatar: props.storeAvatar,
      storeProfil: props.storeProfil,
      storeAbout: props.storeAbout,
    };
  }

  render() {
    // pour ameliore le referencement
    const store = this.state.storeName.trim();
    const StoreName = store.replace(/ /g, '-');

    const MobileView = () => (
      <a href={`/store/${StoreName}/${this.state.storeId}`}>
        <Card link key={this.state.storeId}>
          <Image
            style={{ height: '6em' }}
            src={
              this.state.storeProfil
                ? `${this.state.storeProfil}`
                : 'store-icon.png'
            }
          />
          <Image
            style={{
              position: 'absolute',
              top: '27%',
              left: '37%',
              width: '40px',
              height: '40px',
            }}
            circular
            size="medium"
            src={
              this.state.storeAvatar
                ? `${this.state.storeAvatar}`
                : '/afriqua.png'
            }
          />
          <Card.Content style={{ backgroundColor: '#fcfcfc' }}>
            <Card.Header
              textAlign="center"
              style={{ marginTop: 10, fontSize: 'smaller' }}
            >
              {this.state.storeName}
            </Card.Header>
            <Card.Meta>
              <span
                style={{ fontSize: 'smaller' }}
              >{`${this.state.storeFirstName} ${this.state.storeSecondName}`}</span>
            </Card.Meta>
            {/* <Card.Description style={{ fontSize: 'smaller' }} >{this.state.storeAbout.substr(0, 37)}...</Card.Description> */}
          </Card.Content>
          {/* <Card.Content extra style={{ backgroundColor: '#fcfcfc' }}>
            <a style={{ fontSize: 12 }}>
              <Icon name="user" />
              22 Friends
            </a>
            <Grid style={{ marginTop: 20 }} >
            <Grid.Column floated="left" width={8}>
              <h3>{this.state.storeName} Fcfa</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={8}>
              <Rating icon="star" defaultRating={3} maxRating={5} />
            </Grid.Column>
          </Grid>
          </Card.Content> */}
        </Card>
      </a>
    );

    const ComputerView = () => (
      <a href={`/store/${StoreName}/${this.state.storeId}`}>
        <Card link key={this.state.storeId}>
          <Image
            style={{ height: '180.453px' }}
            src={
              this.state.storeProfil
                ? `${this.state.storeProfil}`
                : 'store-icon.png'
            }
          />
          <Image
            style={{
              position: 'absolute',
              top: '30%',
              left: '30%',
              width: '100px',
              height: '100px',
            }}
            circular
            size="medium"
            src={
              this.state.storeAvatar
                ? `${this.state.storeAvatar}`
                : '/afriqua.png'
            }
          />
          <Card.Content style={{ backgroundColor: '#fcfcfc' }}>
            <Card.Header textAlign="center" style={{ marginTop: 20 }}>
              {this.state.storeName}
            </Card.Header>
            <Card.Meta>
              <span>{`${this.state.storeFirstName} ${this.state.storeSecondName}`}</span>
            </Card.Meta>
            <Card.Description>
              {this.state.storeAbout.substr(0, 80)}...
            </Card.Description>
          </Card.Content>
          {/* <Card.Content extra style={{ backgroundColor: '#fcfcfc' }}>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content> */}
        </Card>
      </a>
    );

    const TabletView = () => (
      <a href={`/store/${StoreName}/${this.state.storeId}`}>
        <Card link key={this.state.storeId}>
          <Image
            style={{ height: '140px' }}
            src={
              this.state.storeProfil
                ? `${this.state.storeProfil}`
                : 'store-icon.png'
            }
          />
          <Image
            style={{
              position: 'absolute',
              top: '30%',
              left: '30%',
              width: '80px',
              height: '80px',
            }}
            circular
            size="medium"
            src={
              this.state.storeAvatar
                ? `${this.state.storeAvatar}`
                : '/afriqua.png'
            }
          />
          <Card.Content style={{ backgroundColor: '#fcfcfc' }}>
            <Card.Header textAlign="center" style={{ marginTop: 20 }}>
              {this.state.storeName}
            </Card.Header>
            <Card.Meta>
              <span>{`${this.state.storeFirstName} ${this.state.storeSecondName}`}</span>
            </Card.Meta>
            <Card.Description>
              {this.state.storeAbout.substr(0, 40)}...
            </Card.Description>
          </Card.Content>
          {/* <Card.Content extra style={{ backgroundColor: '#fcfcfc' }}>
            <a>
              <Icon name="user" />
              22 Friends
            </a>

          </Card.Content> */}
        </Card>
      </a>
    );
    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <MobileView />
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <TabletView />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <ComputerView />
        </Responsive>
      </Segment.Group>
    );
  }
}

export default StoreView;
