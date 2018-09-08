import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { Header, Comment, Responsive } from 'semantic-ui-react';

import { getProdCommentQuery } from '../graphql/queries';

import('./mommentLang');

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodid: props.prodId,
      connectusert: props.connectUser,
      ownerid: props.ownerId,
    };
  }

  render() {
    const CLOUD_NAME = 'dg6zkrdqu';
    const { prodid } = this.state;
    const CommentsView = () => (
      <Query query={getProdCommentQuery} variables={{ prodid }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>loading...</p>;
          }
          if (error) return `Error! ${error.message}`;

          const { comment } = data.getProdComment;
          return (
            <div style={{ marginBottom: 10 }}>
              <Responsive {...Responsive.onlyMobile}>
                <Comment.Group>
                  <Header style={{ fontSize: 'smaller' }} as="h3" dividing>
                    Commentaire
                  </Header>

                  {comment.map(com => (
                    <Comment key={com.id}>
                      {com.usercommentavatar ? (
                        <Comment.Avatar src={`http://res.cloudinary.com/${CLOUD_NAME}/image/upload/${com.usercommentavatar}`} />
                      ) : (
                        <Comment.Avatar src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}
                      <Comment.Content>
                        {com.userid === com.prodowner ? (
                          <Comment.Author as="a" style={{ color: 'green', border: 'solid', borderRadius: 30, fontSize: 'smaller', padding: 2 }}>
                            {com.usercommentname}
                          </Comment.Author>
                        ) : (
                          <Comment.Author style={{ fontSize: 'smaller' }} as="a">
                            {com.usercommentname}
                          </Comment.Author>
                        )}

                        <Comment.Metadata>
                          <div>
                            {moment(com.created_at)
                              .locale('fr')
                              .fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text style={{ fontSize: 'smaller' }}>
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
                  ))}
                </Comment.Group>
              </Responsive>
              <Responsive minWidth={768}>
                <Comment.Group>
                  <Header style={{ fontSize: 'medium' }} as="h3" dividing>
                    Commentaire
                  </Header>

                  {comment.map(com => (
                    <Comment key={com.id}>
                      {com.usercommentavatar ? (
                        <Comment.Avatar src={`http://res.cloudinary.com/${CLOUD_NAME}/image/upload/${com.usercommentavatar}`} />
                      ) : (
                        <Comment.Avatar src="https://www.goafricaonline.com/images/drapeaux/afrique.png" />
                      )}
                      <Comment.Content>
                        {com.userid === com.prodowner ? (
                          <Comment.Author as="a" style={{ color: 'green', border: 'solid', borderRadius: 30, fontSize: 'medium', padding: 3 }}>
                            {com.usercommentname}
                          </Comment.Author>
                        ) : (
                          <Comment.Author style={{ fontSize: 'medium' }} as="a">
                            {com.usercommentname}
                          </Comment.Author>
                        )}

                        <Comment.Metadata>
                          <div>
                            {moment(com.created_at)
                              .locale('fr')
                              .fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text style={{ fontSize: 'medium' }}>
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
                  ))}
                </Comment.Group>
              </Responsive>
            </div>
          );
        }}
      </Query>
    );

    return <CommentsView />;
  }
}

export default Comments;
