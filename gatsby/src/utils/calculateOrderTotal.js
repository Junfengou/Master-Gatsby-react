import calculatePizzaPrice from './calculatePizzaPrice'

// take a array of order and reduce down to a single number
function calculateOrderTotal( order, pizzas ) {

    // loop over each items in the order
    const total = order.reduce((runningTotal, singleOrder) => {
        const pizza = pizzas.find( singlePizza => singlePizza.id === singleOrder.id)
        return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size)
    }, 0)
    return total;

}

export default calculateOrderTotal