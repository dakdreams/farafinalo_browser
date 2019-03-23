import React from 'react';
import { Message, Container } from 'semantic-ui-react';

class About extends React.Component {
  state = {};
  render() {
    const MessageExampleMessage = () => (
      <Message>
        <Message.Header>Changes in Service</Message.Header>
        <p>We updated our privacy policy here to better service our customers. We recommend reviewing the changes.</p>
      </Message>
    );
    return (
      <Container textAlign="center">
        <MessageExampleMessage />
      </Container>
    );
  }
}

export default About;
