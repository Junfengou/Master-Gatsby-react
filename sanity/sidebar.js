import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

/*
    IMPORTANT NOTE!!
        STOP RIGHT HERE!
            Before you go any further, make sure you let [sanity.json] know that you're adding a custom part!

                now you're ready to build a custom sidebar
*/
function sidebar() {

    return S.list().title(`Slick's Slices`).items([
        // Create a new sub item
        S.listItem().title('Home page').icon(() => <strong>🔥</strong>)
        .child(S.editor().schemaType('storeSettings')
        // make a document id so we don't have bunch of random stuff 
        .documentId('downtown')
        ),
        
        // add in the rest of our documents
        ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
    ]);
}

export default sidebar
