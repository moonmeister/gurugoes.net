// import * as React from "react"
// import { graphql } from "gatsby"

// export default function ActivityArchivePage({ data }) {
//   return (
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   )
// }

// export const query = graphql`
// query blogQuery {
//   allWpPost(sort: { fields: dateGmt, order: DESC }) {
//     totalCount
//     nodes {
//       id
//       title
//       excerpt
//       uri
//       dateGmt
//       author {
//         node {
//           name
//         }
//       }
//       tags {
//         nodes {
//           name
//         }
//       }
//     }
//   }

//   # wpPage(uri: { eq: "/blog/" }) {
//   #   title
//   # }

//   wp {
//     readingSettings {
//       postsPerPage
//     }
//   }
// }
// `;  