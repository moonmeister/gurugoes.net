import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment PostCategory on WpCategory {
    name
    uri
  }

  fragment AllUsedCategories on Query {
    allWpCategory(filter: {count: { ne: null }}) {
      edges {
        node {
          ...PostCategory
        }
      }
    }
  }
`