import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Menu from '../responsive/menu';

const Home = ({ data: { allUsers = [] } }) => {
  const List = allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);
  return (
    <div>
      <Menu />
      <p>drabo abdel kader</p>
      <p>drabo abdel kader</p>
      <p>drabo abdel kader</p>
      <p>drabo abdel kader</p>
      <p>drabo abdel kader</p>
      { List }
    </div>
  );
};

// const List = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);
