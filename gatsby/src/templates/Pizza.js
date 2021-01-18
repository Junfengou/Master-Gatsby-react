import { graphql } from 'gatsby'
import Img from "gatsby-image"
import React from 'react'
import styled from "styled-components"
import SEO from "../components/SEO"


const PizzaGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

function SinglePizzaPage({ data: { pizza }}) {
    console.log(pizza)
    return (
        <>
        {/* nest channing =>  pizza.image?.asset?.fluid?.src [basically a chained if statement to check if one exist]*/}
        <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
        <PizzaGrid>
            <Img fluid={pizza.image.asset.fluid} />
            <div>
                <h2 className="mark">{pizza.name}</h2>
                {pizza.toppings.map((topping) => <li key={topping.id}>{topping.name}</li>)}
            </div>
        </PizzaGrid>
    </>
    )
}
export default SinglePizzaPage


export const query = graphql`
    query ($name: String!) {
        pizza: sanityPizza(name: {eq: $name}) {
            name
            id
            image {
                asset {
                    fluid(maxWidth: 800){
                        ...GatsbySanityImageFluid
                    }
                }
            }
            toppings {
                name
                id
                vegetarian
            }
        }
    }
`