import React from 'react';
import { Query, graphql, compose } from 'react-apollo';
import moment from 'moment';
import { Header, Comment, Form, Button, Container, Card, Loader } from 'semantic-ui-react';

import { getOwnerCommentQuery, makeCommentAllMyClientQuery, getFollowerCommentQuery } from '../graphql/queries';

import('./mommentLang');

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodowner: props.prodowner,
      connectusert: props.connectUser,
      ownerid: props.ownerId,
      usercommentavatar: props.userAvatar,
      userbusinessname: props.businessName,
      text: '',
    };
  }

  // onChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  onSubmit = async () => {
    this.setState({
      text: '',
    });

    const { userbusinessname, usercommentavatar, text } = this.state;
    await this.props.makeCommentAllMyClientQuery({
      variables: { userbusinessname, usercommentavatar, text },
      refetchQueries: [{ query: getOwnerCommentQuery, variables: { prodowner: this.state.prodowner } }],
    });
  };

  getCommentText = (e, { value }) => {
    this.setState({ text: value });
  };

  render() {
    const CLOUD_NAME = 'dg6zkrdqu';
    const { prodowner, text, userbusinessname } = this.state;

    const FollowCommentView = () => (
      <Query query={getFollowerCommentQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader active inline='centered' />;
          }
          if (error) return `Error! ${error.message}`;

          const { result } = data.getFollowerComment;

          return (
            <div style={{ marginBottom: 13, marginTop: 20, marginRight: 5 }}>
              <Comment.Group>
                {result.length !== 0 ? (
                  result.map(com => (
                    <Comment key={com.id}>
                      {com.followedavatar ? (
                        <Comment.Avatar src={`http://res.cloudinary.com/${CLOUD_NAME}/image/upload/${com.followedavatar}`} />
                      ) : (
                        <Comment.Avatar src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}
                      <Comment.Content>
                        <Comment.Author as="a" href={`store/${com.suivi}`} style={{ color: 'green', border: 'solid', borderRadius: 30, padding: 2 }}>
                          {com.magasin}
                        </Comment.Author>

                        <Comment.Metadata>
                          <div>
                            {moment(com.date)
                              .locale('fr')
                              .fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>
                          <p>{com.texto}</p>
                        </Comment.Text>
                        {/* {connectusert === ownerid ? (
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      ) : (
                        ''
                      )} */}
                      </Comment.Content>
                    </Comment>
                  ))
                ) : (
                  <Container style={{ height: '16em', textAlign: 'center' }} textAlign="center">
                    <Card fluid color="red" header="Option 1">
                      vous ne poseder pas de message pour le moment bien venu sur farafinalo!! <br />
                      cree votre store en modifiant votre status dans l angles Mon Profil!!
                    </Card>
                  </Container>
                )}
              </Comment.Group>
            </div>
          );
        }}
      </Query>
    );
    const CommentsView = () => (
      <Query query={getOwnerCommentQuery} variables={{ prodowner }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader active inline='centered' />;
          }
          if (error) return `Error! ${error.message}`;

          const { comment } = data.getOwnerComment;

          return (
            <div style={{ marginBottom: 13, marginTop: 20, marginRight: 5 }}>
              <Comment.Group>
                {comment.length !== 0 ? (
                  comment.map(com => (
                    <Comment key={com.id}>
                      {com.usercommentavatar ? (
                        <Comment.Avatar src={`http://res.cloudinary.com/${CLOUD_NAME}/image/upload/${com.usercommentavatar}`} />
                      ) : (
                        <Comment.Avatar src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}
                      <Comment.Content>
                        {com.userid === com.prodowner ? (
                          <Comment.Author as="a" href="google.fr" style={{ color: 'green', border: 'solid', borderRadius: 30 }}>
                            {com.usercommentname || com.userbusinessname}
                          </Comment.Author>
                        ) : (
                          <Comment.Author as="a">{com.usercommentname}</Comment.Author>
                        )}

                        <Comment.Metadata>
                          <div>
                            {moment(com.created_at)
                              .locale('fr')
                              .fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>
                          <p>{com.text}</p>
                        </Comment.Text>
                        {/* {connectusert === ownerid ? (
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      ) : (
                        ''
                      )} */}
                      </Comment.Content>
                    </Comment>
                  ))
                ) : (
                  <div style={{ width: '100%', height: '20em', textAlign: 'center' }}>pas de de message pour le moment</div>
                )}
              </Comment.Group>
            </div>
          );
        }}
      </Query>
    );

    return (
      <div>
        <Header as="h3" dividing>
          messages
        </Header>
        {userbusinessname ? (
          <div>
            <Form style={{ width: '100%' }} reply>
              <Form.TextArea
                style={{ fontSize: 12 }}
                name="text"
                type="text"
                onChange={this.getCommentText}
                value={text}
                placeholder="envoyer messeage a tous vos abonee"
              />
            </Form>
            <Button onClick={this.onSubmit} type="submit">
              Envoyer
            </Button>
          </div>
        ) : (
          ''
        )}

        {userbusinessname ? <CommentsView /> : <FollowCommentView />}
      </div>
    );
  }
}

export default compose(graphql(makeCommentAllMyClientQuery, { name: 'makeCommentAllMyClientQuery' }))(Messages);
