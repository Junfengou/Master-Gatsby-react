import React, { useState, useContext } from 'react'
import OrderContext from "../components/OrderContext"
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from "../utils/attachNamesAndPrices"
import formatMoney from './formatMoney';

function usePizza({ pizzas, values }) {

    // 1. create a state to hold our orders
    // const [order, setOrder] = useState([]);

    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
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

    // This run when someone submit the form
    async function submitOrder(e) {
        e.preventDefault();
        // console.log(e)
        setLoading(true);
        setError(null);
        //setMessage(null); //This is a huge headache of a bug 
        // gather all the data 
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup,
        }
        console.log(body)

        // 4. send this data to a serverless function when they check out
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    const text = JSON.parse(await res.text());

    // check if everything worked
    if(res.status >= 400 && res.status < 600)
    {
        setLoading(false);
        setError(text.message)
    }
    else {
        setLoading(false);
        setMessage('Success! Come on down for your pizza')
    }
 }





    return { order, addToOrder, removeFromOrder, error, loading, message, submitOrder }
}

export default usePizza
