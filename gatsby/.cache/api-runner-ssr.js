var plugins = [{
      plugin: require('D:/React/Master Gatsby/master-gatsby/Gatsby with React/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('D:/React/Master Gatsby/master-gatsby/Gatsby with React/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('D:/React/Master Gatsby/master-gatsby/Gatsby with React/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"f43pd9zr","dataset":"production","watchMode":true,"token":"skTK9B2cBsgrDHiEAN3vZM5iiXSpSI429vTc1w0pDs4WLNYX8B5l2wlHuAZPJyPvSsJ7s1nFQ5Q4ec89Mcf2dBjOUyU7KfdnxsTnJgO8InyomD7uvEUK7aFBIlIoXg28XiR5JjxIjeIJroUBKu73AkvrkiQFTsf2XBVyOU7CldslE5NEGGiW"},
    },{
      plugin: require('D:/React/Master Gatsby/master-gatsby/Gatsby with React/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
