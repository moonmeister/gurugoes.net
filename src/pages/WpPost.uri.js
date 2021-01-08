// import * as React from "react"
// import { graphql } from "gatsby"

// export default function PostPage({ data }) {
//   return (
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   )
// }

// export const query = graphql`
//   query blogPostQuery($uri: String!) {
//     wpPost(uri: { eq: $uri }) {
//       title
//       author {
//         node {
//           name
//           avatar {
//             foundAvatar
//             rating
//             height
//             width
//             url
//           }
//         }
//       }
//       content
//       dateGmt
//       tags {
//         nodes {
//           # ...WpTag
//           id
//         }
//       }
//     }
//   }
// `;
