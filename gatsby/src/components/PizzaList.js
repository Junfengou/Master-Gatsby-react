import React from 'react'
import { Link } from "gatsby"
 
const SinglePizza = ({ pizza }) => {
    return (
        <div>
            <Link to={`/pizza/${pizza.name}`}>
                <h2>
                    <span className="mark">{pizza.name}</span>
                </h2>

                <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
            </Link>
        </div>
    )
}

function PizzaList({pizzas}) {
    console.log(pizzas)
    return (
        <div>
            <p>{pizzas.map((pizza) => <SinglePizza key={pizza.id} pizza={pizza} /> )}</p>
        </div>
    )
}

export default PizzaList
