import React from 'react';
import { Card, Message, Header, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// class  extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {  };
//   }
//   render() {
//     return (
//       <Card style={{ border: 'none' }}>
//     <Card.Content header={props.header1}style={{ textAlign: 'center' }} />
//     <Card.Content description={props.about} />
//     <Card.Content header={props.header2}style={{ textAlign: 'center' }} />
//     <Card.Content description={props.description1} />
//     <Card.Content extra>
//       <Icon name="user" />
//       4 clients
//     </Card.Content>
//   </Card>
//     );
//   }
// }

// export default ;

const description = [
  'Bien venu sur farafinalo toute l equipe vous souhaite une agreable journer',
  'en temp que client privilegier vous aver des bon de reduction et de trasport de n inporte quelle article acheter',
].join(' ');

const CardExampleExtraContent = props => (
  <Card style={{ border: 'none' }}>
    <Card.Content header={props.allName} style={{ textAlign: 'center' }} />
    {props.statu === 'client' ? (
      <Card.Content description={description} />
    ) : (
      <div>
        <Message visible>{props.about}</Message>
        {/* <Card.Content description={props.about} /> */}
        <Header as="h3" style={{ textAlign: 'center' }}>
          {props.statu}
        </Header>
        {/* <Header header={props.statu} style={{ textAlign: 'center' }} /> */}
        <Grid>
          <Grid.Column floated="left" width={4}>
            <Image
              style={{ height: '3em' }}
              src="https://image.freepik.com/psd-gratuitement/petit-magasin-icone-psd_30-2392.jpg"
              verticalAlign="middle"
            />
          </Grid.Column>
          <Grid.Column floated="right" width={9}>
            <Link to={`/store/${props.owner}`}>
              <Button fluid>{props.store}</Button>
            </Link>
          </Grid.Column>
        </Grid>
        {/* <Card.Content description={props.store} /> */}
        {/* <Card.Content extra>
          <Icon name="user" />
          {props.customer} Clients
        </Card.Content> */}
      </div>
    )}
  </Card>
);

export default CardExampleExtraContent;
