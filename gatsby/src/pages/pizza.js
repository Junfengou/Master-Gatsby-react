import { graphql } from 'gatsby'
import React from 'react'
import PizzaList from "../components/PizzaList"


// Gatsby takes out the headache of loading and check to see if data are being fetched, very similar to server side rendering 

function PizzaPage({ data }) {
    const pizzas = data.pizzas.nodes;
    return (
        <>
        <PizzaList pizzas={pizzas} />
        </>
    )
}

export default PizzaPage

//In graphql. If you want to grab all the image items in a nested field, you can just do [...GatsbySanityImageFluid ]

/*
    IMPORTANT NOTE:
        Gatsby will recognize that you have exported a graphQL on the page level, so you don't have to pass it into the page. 
        You can just simply access it with props
*/
export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400){
                            ...GatsbySanityImageFluid 
                        }
                    }
                }
            }
        }
    }
`