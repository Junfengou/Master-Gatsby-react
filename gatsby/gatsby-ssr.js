/*
    The difference between this [gatsby-ssr] file and the [gatsby-browser] file is... 

    [gatsby-browser] : run once when the page is loaded, and run once when the page is generated
    [gatsby-ssr] : server side rendering 
*/

import React from 'react'
import Layout from './src/components/Layout'

function wrapPageElement({ element, props }) {
    return (
        <Layout {...props}>
            {element}
        </Layout>
    )
}

// Context API
export function wrapRootElement({ element }) {
    return <OrderProvider>{element}</OrderProvider>;
  }

export {wrapPageElement}
