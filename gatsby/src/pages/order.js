import React from 'react'
import useForm from "../utils/useForm"
import SEO from "../components/SEO";
import Img from 'gatsby-image';
import calculatePizzaPrice from "../utils/calculatePizzaPrice"
import formatMoney from "../utils/formatMoney"
import OrderStyles from "../styles/OrderStyle"
import MenuItemStyles from "../styles/MenuItemStyles"
import usePizza from "../utils/usePizza"
import PizzaOrder from "../components/PizzaOrder"
import calculateOrderTotal from "../utils/calculateOrderTotal"
import { graphql } from 'gatsby'


function OrderPage({ data }) {
    const pizzas = data.pizzas.nodes;
    const { values, updateValue } = useForm({
        name: '',
        email: '',
        mapleSyrup: '', //This is for bots lol
    })

    const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({ pizzas, values: values });

    if(message)
    {
     return (<p>{message}</p>)   
    }

    return (
        <>
        <SEO title="Order a pizza!"/>
        <OrderStyles onSubmit={submitOrder}>
            <fieldset disabled={loading}>
                <legend>Your info</legend>
                <label htmlFor="name" >name</label>
                <input type="text" name="name" id="name" value={values.name} onChange={updateValue} />

                <label htmlFor="email" >Email</label>
                <input type="email" name="email" id="email" value={values.email} onChange={updateValue} />

                {/* This is honey pot. A trap built for robots. The field is only visible to bots via css so nothing to worry about */}
                <input type="mapleSyrup" className="mapleSyrup" name="mapleSyrup" id="mapleSyrup" value={values.mapleSyrup} onChange={updateValue} />
                
            </fieldset>

            <fieldset className="menu" disabled={loading}>
                <legend>Menu</legend>
                {pizzas.map(pizza => (
                    <MenuItemStyles key={pizza.id}>
                        <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
                        <div>
                            <h2>{pizza.name}</h2>
                        </div>
                        <div>
                            {['S', 'M', 'L'].map(size => (
                                <button key={size} onClick={() => addToOrder({ id: pizza.id, size })} type="button">{size} {formatMoney(calculatePizzaPrice(pizza.price, size))}</button>
                            ))}
                        </div>
                    </MenuItemStyles>
                ))}
            </fieldset>

            <fieldset className="order" disabled={loading}>
                <legend>Order</legend>
                <PizzaOrder order={order} pizzas={pizzas} removeFromOrder={removeFromOrder} />
            </fieldset>

            <fieldset disabled={loading}>
                <h3>Your total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
                <div>
                    {error ? <p>{error}</p> : ''}
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Placing order...' : 'Order ahead!'}</button>
            </fieldset>

        </OrderStyles>
        </>
    )
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                price
                image {
                    asset {
                        fluid(maxWidth: 100)
                        {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        } 
    }
`

export default OrderPage
