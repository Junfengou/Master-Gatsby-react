import React, { useState, useEffect } from 'react'


const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

function useLatestData() {
    const [hotSlices, setHotSlices] = useState();
    const [slicemasters, setSlicemasters] = useState();

    // use side effect to fetch the data from the graphQL endpoint

    useEffect(() => {
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                // IMPORTANT NOTE: This is querying sanity, not gatsby
                query: gql`
                query {
                    StoreSettings(id: "downtown")
                    {
                    name
                    slicemaster{
                       ${deets}
                    }
                    hotSlices{
                        ${deets}
                    }
                    }
                }
            `,
            })
        }).then(res => res.json()).then(res => {
            // check for errors

            // set the data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return {hotSlices, slicemasters}
}

export default useLatestData


/*
 `
                    query {
                        StoreSettings(id: "downtown")
                        {
                        name
                        slicemaster{
                            name
                        }
                        hotSlices{
                            name
                        }
                        }
                    }
                `,


*/