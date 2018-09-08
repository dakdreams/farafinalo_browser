import { gql } from 'apollo-boost';

const meQuery = gql`
  {
    me {
      id
      email
      firstname
      secondname
      statu
      business
      tell
      tell2
      about
      avatar
      profil
    }
  }
`;

const allUsersQuery = gql`
  {
    allUsers {
      id
      tell
      business
      secondname
    }
  }
`;

const allStoreQuery = gql`
  {
    allStore {
      id
      email
      firstname
      secondname
      statu
      business
      tell
      tell2
      about
      avatar
      profil
    }
  }
`;

const allProductQuery = gql`
  {
    allProduct {
      ok
      products {
        id
        prodname
        prodcathegory
        prodprice
        prodescription
        prodimages
        prodgaranties
        prodstock
        prodtransport
      }
    }
  }
`;

const addProductMutation = gql`
  mutation(
    $prodname: String!
    $prodcathegory: String!
    $prodprice: Int!
    $prodescription: String!
    $prodstock: Int
    $prodimages: [String!]
    $prodgaranties: String
    $prodtransport: String
  ) {
    addProduct(
      prodname: $prodname
      prodcathegory: $prodcathegory
      prodprice: $prodprice
      prodescription: $prodescription
      prodimages: $prodimages
      prodstock: $prodstock
      prodgaranties: $prodgaranties
      prodtransport: $prodtransport
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
const getOwnerProductQuery = gql`
  mutation($id: Int!) {
    getOwnerProduct(id: $id) {
      ok
      productOne {
        id
        prodname
        prodcathegory
        prodprice
        prodescription
        prodimages
        prodgaranties
        prodtransport
        prodstock
        owner
      }
    }
  }
`;

const updateProductQuery = gql`
  mutation(
    $id: Int!
    $prodname: String!
    $prodcathegory: String!
    $prodprice: Int!
    $prodescription: String!
    $prodstock: Int
    $prodimages: [String!]
    $prodgaranties: String
    $prodtransport: String
  ) {
    updateProduct(
      id: $id
      prodname: $prodname
      prodcathegory: $prodcathegory
      prodprice: $prodprice
      prodescription: $prodescription
      prodimages: $prodimages
      prodstock: $prodstock
      prodgaranties: $prodgaranties
      prodtransport: $prodtransport
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const cathegoryAllProductQuery = gql`
  query($cathegory: String!) {
    cathegoryAllProduct(cathegory: $cathegory) {
      ok
      products {
        id
        prodname
        prodprice
        prodimages
        prodescription
      }
    }
  }
`;

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

const getProductQuery = gql`
  mutation($id: Int!) {
    getProduct(id: $id) {
      ok
      productOne {
        id
        prodname
        prodcathegory
        prodprice
        prodescription
        prodimages
        prodgaranties
        prodtransport
        prodstock
        owner
      }
    }
  }
`;

const getOwnerInfoQuery = gql`
  mutation($id: Int!) {
    ownerInfo(id: $id) {
      ok
      user {
        firstname
        secondname
        profil
        avatar
        avatar
        business
        email
        about
        tell
        tell2
      }
    }
  }
`;

const makeCommentQuery = gql`
  mutation($text: String!, $prodid: Int!, $prodowner: Int!, $usercommentname: String!, $usercommentavatar: String) {
    makeComment(text: $text, prodid: $prodid, prodowner: $prodowner, usercommentname: $usercommentname, usercommentavatar: $usercommentavatar) {
      ok
      comment {
        id
        text
        prodid
        userid
        prodowner
        usercommentname
        usercommentavatar
      }
    }
  }
`;

const makeCommentAllMyClientQuery = gql`
  mutation($text: String!, $userbusinessname: String!, $usercommentavatar: String) {
    makeCommentAllMyClient(text: $text, userbusinessname: $userbusinessname, usercommentavatar: $usercommentavatar) {
      ok
    }
  }
`;

const simularCathegoryQuery = gql`
  query($cathegory: String!, $prodid: Int!) {
    simularCathegory(cathegory: $cathegory, id: $prodid) {
      ok
      products {
        id
        prodname
        prodprice
        prodimages
        prodescription
      }
    }
  }
`;

const getUserAllProductQuery = gql`
  {
    getUserAllProduct {
      ok
      product {
        id
        prodname
        prodcathegory
        prodprice
        prodescription
        prodimages
        prodgaranties
        prodstock
      }
    }
  }
`;

const registerMutation = gql`
  mutation($firstname: String!, $secondname: String!, $email: String!, $password: String!) {
    register(firstname: $firstname, secondname: $secondname, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const storeAllProductQuery = gql`
  query($owner: Int!) {
    storeAllProduct(owner: $owner) {
      ok
      products {
        id
        prodname
        prodcathegory
        prodprice
        prodescription
        prodimages
        prodgaranties
        prodstock
        owner
      }
    }
  }
`;

const updateMutation = gql`
  mutation(
    $firstname: String!
    $secondname: String!
    $email: String!
    $about: String
    $business: String
    $tell: String
    $tell2: String
    $statu: String
  ) {
    updating(
      firstname: $firstname
      secondname: $secondname
      email: $email
      about: $about
      business: $business
      statu: $statu
      tell: $tell
      tell2: $tell2
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const getProdCommentQuery = gql`
  query($prodid: Int!) {
    getProdComment(prodid: $prodid) {
      ok
      comment {
        id
        text
        prodid
        userid
        prodowner
        usercommentname
        usercommentavatar
        created_at
        updated_at
      }
    }
  }
`;

const getOwnerCommentQuery = gql`
  query($prodowner: Int!) {
    getOwnerComment(prodowner: $prodowner) {
      ok
      comment {
        id
        text
        prodid
        userid
        prodowner
        usercommentname
        usercommentavatar
        userbusinessname
        created_at
        updated_at
      }
    }
  }
`;

const makeFollowQuery = gql`
  mutation($followed: Int!) {
    makeFollow(followed: $followed) {
      ok
    }
  }
`;

const deleteFollowQuery = gql`
  mutation($followed: Int!) {
    deleteFollow(followed: $followed) {
      ok
    }
  }
`;

const getFollowersQuery = gql`
  query($followed: Int!) {
    getFollowers(followed: $followed) {
      ok
      followers {
        id
        follower
        followed
        created_at
        updated_at
      }
    }
  }
`;

const checkFollowersQuery = gql`
  query($followed: Int!) {
    checkFollowers(followed: $followed) {
      ok
    }
  }
`;

const getFollowerCommentQuery = gql`
  {
    getFollowerComment {
      ok
      result {
        id
        texto
        suiveur
        suivi
        magasin
        date
        followedavatar
      }
    }
  }
`;

const getFollowStoreQuery = gql`
  {
    getFollowStore {
      ok
      result {
        id
        storename
        storeavatar
        storeprofil
        storeabout
        ownerfirstname
        ownersecondname
        date
      }
    }
  }
`;

const likeQuery = gql`
  mutation($productId: Int!, $score: Int!) {
    like(productId: $productId, score: $score) {
      ok
    }
  }
`;

const checkLikesQuery = gql`
mutation($productId: Int!) {
    checkLikes(productId: $productId) {
      ok
    }
  }
`;

const getLikesQuery = gql`
query($productId: Int!) {
  getLikes(productId: $productId) {
    ok
    LikeProducts {
      score
      userId
      created_at
      updated_at
    }
  }
}
`;

const getScoreQuery = gql`
query($productId: Int!) {
  getScore(productId: $productId) {
    prodScore {
      score
    }
  }
}
`;

export {
  meQuery,
  allProductQuery,
  allUsersQuery,
  allStoreQuery,
  addProductMutation,
  getOwnerProductQuery,
  updateProductQuery,
  cathegoryAllProductQuery,
  loginMutation,
  getProductQuery,
  getOwnerInfoQuery,
  makeCommentQuery,
  makeCommentAllMyClientQuery,
  simularCathegoryQuery,
  getUserAllProductQuery,
  registerMutation,
  storeAllProductQuery,
  updateMutation,
  getProdCommentQuery,
  getOwnerCommentQuery,
  makeFollowQuery,
  deleteFollowQuery,
  getFollowersQuery,
  checkFollowersQuery,
  getFollowerCommentQuery,
  getFollowStoreQuery,
  likeQuery,
  checkLikesQuery,
  getLikesQuery,
  getScoreQuery,
};
