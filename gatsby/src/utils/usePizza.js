import React, { useState } from 'react'

function usePizza({ pizzas, input }) {

    // 1. create a state to hold our orders
    const [order, setOrder] = useState([]);
    // 2. make a function to add things to order
    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }
    // 3. make a function to remove things from order
    function removeFromOrder(index)
    {
        setOrder([
            // everything before the item we want to remove
            ...order.slice(0, index),
            // everything after the item we want to remove
            ...order.slice(index + 1),
        ])
    }
    // 4. send this data to a serverless function when they check out

    return { order, addToOrder, removeFromOrder }
}

export default usePizza
