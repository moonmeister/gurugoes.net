const adapter = require("gatsby-adapter-netlify");

if (process.env.GATSBY_CLOUD !== true) {
  require('dotenv').config();
}

const siteUrl = 'https://gurugoes.net';


module.exports = {
  adapter: adapter({
    excludeDatastoreFromEngineFunction: true,
    imageCDN: true,
  }),
  siteMetadata: {
    siteUrl,
    title: 'gurugoes.net',
    twitterHandle: '@moon_meister',
  },
  plugins: [
    /* Source Plugins*/
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://cms.gurugoes.net/graphql',
        type: {
          MediaItem: {
            createFileNodes: false,
          },
        },
        html: {
          useGatsbyImage: true,
        },
      },
    },

    /* Data transformer Plugins */
    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        types: {
          WpPost: (source) => source?.content ?? '',
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    /* Gatsby Feature Plugins */
    'gatsby-plugin-layout',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    /* Third Party Integration Plugins */
    'gatsby-plugin-postcss',

    /* Misc Utilities to generate misc site related structured content */
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/category/*'],
        query: `
        {
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                path: uri
                modifiedGmt
              }
              ... on WpPage {
                path: uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allWpContentNode: { nodes } }) => nodes,
        serialize: ({ path, modifiedGmt }) => ({
          url: path,
          lastmod: modifiedGmt,
        }),
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Guru Goes',
        icon: 'src/images/activity.svg',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site,
                allWpPost: { nodes: allPosts },
              },
            }) =>
              allPosts.map(
                ({
                  title,
                  excerpt,
                  uri,
                  dateGmt,
                  author: { node: author },
                  categories,
                }) => ({
                  title,
                  description: excerpt,
                  author: author.name,
                  date: dateGmt,
                  categories: categories.nodes.map((node) => node.name),
                  url: `${site.siteMetadata.siteUrl}${uri}`,
                })
              ),
            query: `{
  allWpPost(sort: {dateGmt: DESC}) {
    nodes {
      title
      dateGmt
      uri
      excerpt
      categories {
        nodes {
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}`,
            output: '/rss.xml',
            title: 'Guru Goes RSS Feed',
          },
        ],
      },
    },
    /* Build Plugins */
    'gatsby-plugin-relative-ci',
  ],
};
