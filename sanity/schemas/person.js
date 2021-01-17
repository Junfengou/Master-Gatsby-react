/*
    IMPORTANT NOTES:
        This file goes hand to hand with sanity, which is a headless CMS.
        Basically like Prisma, a "database" that allows you to upload content by specifying the fields and items you want to upload

        Once all the requirements are listed, you can refresh sanity studio and play around with it.

        This file must be exported to [schema.js] for it to work

*/

import { MdLocalPizza as icon } from "react-icons/md"

export default {
    // computer name
    name: 'person',
    // visible title
    title: 'Slicemasters',
    type: 'document',
    // icon,
    icon: () => '🧔',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            description: "Tell us a bit about this person",
        },

        {
            name: 'image',
            title: 'Image',
            type: 'image',
            option: {
                hotspot: true, // The purpose of hotspot is to let you sort of customize your photo by highlighting certain spot before uploading it to the database
            }
        },

    ],

}