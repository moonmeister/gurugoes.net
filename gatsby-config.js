require("dotenv").config()

module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: "gurugoes.net",
  },
  plugins: [
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
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
