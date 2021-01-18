import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from "styled-components"


const ToppingStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;

    a {
        display: grid;
        padding: 5px;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        align-items: center;
        border-radius: 2px;
        background: var(--grey);
        text-decoration: none;
        .count {
            background: white;
            padding: 2px 5px
        }
        //&[aria-current=page]
        &.active {
            background: var(--yellow);
        }
    }
    
`

function countPizzaInToppings(pizzas)
{
    // return the pizzas with count
    // flat() will take array of array and turn it into one big array
    const counts = pizzas.map((pizza) => pizza.toppings).flat().reduce((acc, topping) => {
        // check if this is an existing topping
        const existingTopping = acc[topping.id];
        if(existingTopping)
        {
            // if it is, increment by 1
            existingTopping.count += 1;
        }

        // otherwise create a new entry in our acc and set it to one
        else {
            acc[topping.id] = {
                id: topping.id,
                name: topping.name,
                count: 1,
            }
        }
        return acc;
    }, {})

    //sort them based on their count
    const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)
    return sortedToppings;
}

//static query
function ToppingsFilter({ activeTopping }) {
    // Get a list of all the toppings
    const { toppings, pizzas } = useStaticQuery(graphql`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                    vegetarian
                }
            }
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `)
    console.clear()
    console.log({toppings, pizzas})
    // Get a list of all the pizza with their toppings
    const toppingWithCount = countPizzaInToppings(pizzas.nodes)
    console.log(toppingWithCount)
    // Count how many pizzas are in each toppings

    // Loop over the list of toppings and display the topping and count of pizzas in that topping
    

    // Link it up

    return (
        <ToppingStyles>
            <Link to="/pizza">
            <span className="name">All</span>
                    <span className="count">{pizzas.nodes.length}</span>
            </Link>
            {toppingWithCount.map((topping) => (
                <Link key={topping.id} to={`/topping/${topping.name}`} className={topping.name === activeTopping ? 'active' : ''} >
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                </Link>
    ))}
        </ToppingStyles>
    )
}

export default ToppingsFilter
