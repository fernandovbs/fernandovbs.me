let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"

if (activeEnv === 'development') {
  require("dotenv").config({
    path: `.env.${activeEnv}`,
  });  
}

module.exports = {
  siteMetadata: {
    title: 'Fernando Souza - DEV life',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-image',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
//        baseUrl: 'wpdemo.gatsbycentral.com',
        baseUrl: 'fernandovbsouza.wordpress.com',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: true,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          wpcom_user: "fernandovbsouza",
          wpcom_pass: process.env.WORDPRESS_PASSWORD,
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: "64989",            
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
      },
    },
    {
    resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Merriweather']
        },
      },
    },    
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'project',
        path: './data'
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-purgecss',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
