import React from 'react'

const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

function formatMoney(cents) {
    return formatter.format(cents / 100)
}

export default formatMoney
