const path = require(`path`);

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {};

  const types = ['WpPost', 'WpPage'];

  types.forEach((type) => {
    resolvers[type] = {
      cleanExcerpt: {
        type: 'String',
        resolve: (source) => {
          const excerpt = source?.excerpt ?? '';
          return excerpt.replace(/<[^>]*>?/gm, '').trim();
        },
      },
    };
  });

  createResolvers(resolvers);
};

exports.createPages = async (gatsbyUtilities) => {
  const posts = await getPosts(gatsbyUtilities);
  const categories = await getCategories(gatsbyUtilities);

  return Promise.all([
    createIndividualBlogPostPages({ posts, gatsbyUtilities }),
    createIndividualCategoryPages({ categories, gatsbyUtilities }),
  ]);
};

/**
 * This function creates all the individual blog pages in this site
 */
async function createIndividualBlogPostPages({ posts, gatsbyUtilities }) {
  return Promise.all(
    posts.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/Post.js`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  );
}

async function createIndividualCategoryPages({ categories, gatsbyUtilities }) {
  return Promise.all(
    categories.map(({ category }) =>
      gatsbyUtilities.actions.createPage({
        path: category.uri,
        component: path.resolve(`./src/templates/Category.js`),
        context: {
          id: category.id,
        },
      })
    )
  );
}

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpPost.edges;
}

async function getCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      allWpCategory {
        edges {
          category: node {
            id
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpCategory.edges;
}
