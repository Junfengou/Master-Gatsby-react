/*
    IMPORTANT NOTES:
        This file goes hand to hand with sanity, which is a headless CMS.
        Basically like Prisma, a "database" that allows you to upload content by specifying the fields and items you want to upload

        Once all the requirements are listed, you can refresh sanity studio and play around with it.

        This file must be exported to [schema.js] for it to work

*/

import { MdLocalPizza as icon } from "react-icons/md"
import PriceInput from "../components/PriceInput"

export default {
    // computer name
    name: 'pizza',
    // visible title
    title: 'Pizzas',
    type: 'document',
    // icon,
    icon: () => '🍕',
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'Name of the pizza'
        },

        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            option: {
                source: 'name', // The source of this slug come from [name] field which is right above this one
                maxLength: 100,
            }
        },

        {
            name: 'image',
            title: 'Image',
            type: 'image',
            option: {
                hotspot: true, // The purpose of hotspot is to let you sort of customize your photo by highlighting certain spot before uploading it to the database
            }
        },

        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price of the pizza in cents',
            validation: Rule => Rule.min(1000).max(50000),
            inputComponent: PriceInput,
        },

        {
            name: 'toppings',
            title: 'Toppings',
            type: 'array',
            of: [{ type: 'reference', to: [{type : 'topping'}] }] //to: [{type : 'topping'}] => topping come from name: topping in the [toppings.js]
        },
    ],

    preview: {
        select: {
            name: 'name',
            media: 'image',
            topping0: 'toppings.0.name',
            topping1: 'toppings.1.name',
            topping2: 'toppings.2.name',
            topping3: 'toppings.3.name',
        },
        prepare: ({name, media, ...toppings}) => {
            // 1. Filter undefined toppings out 
            const tops = Object.values(toppings).filter(Boolean)
            // 2. Return the preview object for the pizza
            return {
                title: name,
                media, 
                // subtitle: Object.values(toppings).join(', ')
                subtitle: tops.join(', ')
            }
        }
    }

}