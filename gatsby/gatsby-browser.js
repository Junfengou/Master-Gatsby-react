/* This is a special file 

    This file allows users to hook in any external gatsby api or files if so desired

    we can use this to ask gatsby to automatically wrap every page with the Layout component instead of doing it manually on every page
*/


// The purpose of this function is so that whenever we generate a page, gatsby will wrap that page with something
import React from 'react'
import Layout from './src/components/Layout'

function wrapPageElement({ element, props }) {
    return (
        <Layout {...props}>
            {element}
        </Layout>
    )
}

export {wrapPageElement}
