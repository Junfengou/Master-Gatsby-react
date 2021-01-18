// Dynamically create pages

// IMPORTANT NOTE: anytime you make a change in here, you have to kill the server and restart it 
import path from "path" //this come from node directly (Node API)
import fetch from "isomorphic-fetch" //Since regular fetch is a browser only action, we need this import to fetch API data 

async function turnPizzaIntoPages({ graphql, actions })
{
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                }
            }
        }
    `)

    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            // url to the page
            path: `pizza/${pizza.name}`,
            component: pizzaTemplate,
            // If you want to pass unique data into each generated page, context is way to do it. You'll find the item in the react dev tool => pageContext
            context: {
                name: pizza.name
            } 
        });
    })
}


async function turnToppingIntoPages({ graphql, actions })
{
    // 1. Get the template
    const toppingsTemplate = path.resolve('./src/pages/pizza.js')
    // 2. query all the toppings 
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `)
    // 3. createPage for that topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingsTemplate,
            context: {
                topping: topping.name,
                // TODO Regex for topping
                toppingRegex: `/${topping.name}/i`,
            }
        })
    })

    // 4. Passing topping data to Pizza.js
}


async function fetchBeersAndTurnIntoNodes({
    actions,
    createNodeId,
    createContentDigest,
  })
{
    // 1. fetch a list of beers
    const res = await fetch('https://api.sampleapis.com/beers/ale')
    const beers = await res.json()
    console.log(beers)
    // 2. loop over each one
    beers.forEach((beer) => {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer), // internal thing for gatsby, so it knows if the data has changed
            }
        };
        // 3. create a node for that beer
        actions.createNode({
            ...beer, 
            ...nodeMeta
        })
    })

}

// This is use to source third party API data with Gatsby
export async function sourceNodes(params) {
    // fetch a list of beers and source them into our gatsby API!
    await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
  }


export async function createPages(params) {
    // Create pages dynamically 

    await Promise.all([
    // 1. Pizzas
    turnPizzaIntoPages(params),
    // 2. Toppings
    turnToppingIntoPages(params)
    // 3. Slicemasters
    ])
}

