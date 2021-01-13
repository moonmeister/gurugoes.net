require("dotenv").config()

module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    siteUrl: "https://www.gurugoes.net",
    title: "gurugoes.net",
  },
  plugins: [
    /* Source Plugins*/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-wordpress-experimental",
      options: {
        url: "https://cms.gurugoes.net/graphql",
      },
    },
    // {
    //   resolve: "gatsby-source-strava",
    //   options: {
    //     stravaClientId: process.env.STRAVA_CLIENT_ID,
    //     stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
    //     stravaToken: process.env.STRAVA_TOKEN,
    //   },
    // },

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
    /* Third Party Integration Plugins */
    "gatsby-plugin-postcss",
    "gatsby-plugin-linaria",
    "gatsby-plugin-preact",
    "gatsby-plugin-react-helmet",

    /* Misc Utilities to generate misc site related structured content */
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },

    /* Hosting and backend plugins */
    "gatsby-plugin-netlify",

    /* Build Plugins */
    "gatsby-plugin-webpack-size",
  ],
};
