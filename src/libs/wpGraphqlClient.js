import { gql, GraphQLClient } from 'graphql-request';
const client = new GraphQLClient(
  'https://gurugoes.api.moonmeister.net/graphql',
  {
    headers: {},
  }
);

export async function listCommentsByPostId(postId) {
  return client.request(
    gql`
      query postComments($postId: ID!) {
        post(id: $postId, idType: DATABASE_ID) {
          comments {
            nodes {
              content
              databaseId
              parentDatabaseId
              author {
                node {
                  name
                }
              }
              dateGmt
            }
          }
        }
      }
    `,
    { postId }
  );
}

export async function createComment(data) {
  return client.request(
    gql`
      mutation postComment(
        $name: String!
        $email: String!
        $comment: String!
        $commentOn: Int!
      ) {
        createComment(
          input: {
            author: $name
            authorEmail: $email
            content: $comment
            commentOn: $commentOn
          }
        ) {
          success
          comment {
            approved
          }
        }
      }
    `,
    data
  );
}
