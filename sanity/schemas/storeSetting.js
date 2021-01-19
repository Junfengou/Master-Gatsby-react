/*
    IMPORTANT NOTES:
        This file goes hand to hand with sanity, which is a headless CMS.
        Basically like Prisma, a "database" that allows you to upload content by specifying the fields and items you want to upload

        Once all the requirements are listed, you can refresh sanity studio and play around with it.

        This file must be exported to [schema.js] for it to work

*/



export default {
    // computer name
    name: 'storeSettings',
    // visible title
    title: 'Settings',
    type: 'document',
    // icon,
    icon: () => '🔍',
    fields: [

        {
            name: 'name',
            title: 'Store Name',
            type: 'string',
            description: 'Name of the pizza'
        },

        {
            name: 'slicemaster',
            title: 'Slicemasters current slicing',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'person'}] }]
        },

        {
            name: 'hotSlices',
            title: 'Hot slices available in the case',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'pizza'}] }]
        }
    ],

}