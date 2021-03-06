if (process.env.GATSBY_CLOUD !== true) {
  require("dotenv").config()
}

const {
  NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === 'production';
const siteUrl = 'https://gurugoes.net';

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    siteUrl,
    title: "gurugoes.net",
    twitterHandle: "@moon_meister"
  },
  plugins: [
    /* Source Plugins*/
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://cms.gurugoes.net/graphql",
      },
    },

    /* Data transformer Plugins */
    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        types: {
          WpPost: (source) => source?.content ?? "",
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    /* Gatsby Feature Plugins */
    "gatsby-plugin-layout",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    /* Third Party Integration Plugins */
    "gatsby-plugin-postcss",
    "gatsby-plugin-preact",

    /* Misc Utilities to generate misc site related structured content */
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Guru Goes",
        icon: "src/images/activity.svg",
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
            query: `
              {
                allWpPost(
                  sort: {fields: [dateGmt], order: DESC}
                ) {
                  nodes {
                    title
                    dateGmt
                    uri
                    excerpt
                    categories {
                      nodes{
                        name
                      }
                    }
                    author{
                      node {
                        name
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Guru Goes RSS Feed",
          },
        ],
      },
    },

    /* Hosting and backend plugins */
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: isProduction ? 'gg-prod' : 'gg-dev',
        allowLocal: !isProduction,
      },
    },

    /* Build Plugins */
    "gatsby-plugin-webpack-size",
  ],
};
