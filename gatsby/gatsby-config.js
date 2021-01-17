// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.

// This file serve as a gateway for connecting gatsby to sanity, so we can use GraphiQL to query data


/*
    IMPORTANT NOTE: refer to [An intro to gatsby-config and sourcing data video]
        In the documentation of Gatsby-config, it's listed to use...
            module.exports = {....}
                this is known as the common JS syntax

        In Node JS, You can do this
            export default {....}
                this is known as the ES module
                To make this work, [package.json] have a script option : ("build": "cross-env NODE_OPTIONS=\"-r esm\" gatsby build",)

            
*/

/*
    ANOTHER IMPORTANT NOTE:
        In order to surface sanity data, you need various plug-ins
*/

// side note: All the plug-ins are installed via npm in the [package.json] under dependencies 
    // token is obtained from setting => API => Tokens => generate read only token 


import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); //piping the env file in here


export default {
    siteMetadata : {
        title: "Slicks Slices",
        siteUrl: 'https://gatsby.pizza',
        description: "The best communist pizza"
    },

    /*
        IMPORTANT NOTE TO SELF:
            next time building this project...
                after specifying the plugins, run this command on the backend [sanity graphql deploy (name of dataset)]
                Sanity on have their own API, we need to convert it to Gatsby's API so we can query the data
    */
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
          // this is the name of the plugin you are adding
          resolve: 'gatsby-source-sanity',
          options: {
            projectId: 'f43pd9zr',
            dataset: 'production',
            watchMode: true,
            token: process.env.SANITY_TOKEN,
          },
        },
      ],
}


