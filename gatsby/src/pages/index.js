import React from 'react'
import Layout from "../components/Layout"
import useLatestData from "../utils/useLatestData"
import { HomePageGrids } from "../styles/Grids"
import LoadingGrid from '../components/LoadingGrid'
import ItemGrid from '../components/ItemGrid'


function CurrentlySlicing({ slicemasters }) {
    console.log(slicemasters)
    return(
        <div>
            <h2 className="center">
                <span className="mark tilt">Slicemasters On</span>
            </h2>
            <p>Home slices, standing by</p>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length  && (<p>No one is working right now</p>)}
            {slicemasters?.length && <ItemGrid items={slicemasters} />}
        </div>
    )
}
function HotSlices({ hotSlices }) {
    return(
        <div>
            <h2 className="center">
                <span className="mark tilt">Hot slices</span>
            </h2>
            <p>Come on by, and buy a slice!</p>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length  && (<p>Nothing in the case</p>)}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
        </div>
    )
}

function HomePage () {

    const {slicemasters, hotSlices} = useLatestData();
    return (
        <div className="center">
            <h1>Best Pizza Downtown!</h1>
            <p>Open 9am to 8pm Every single day!</p>
            <HomePageGrids>
                 <CurrentlySlicing slicemasters={slicemasters} />
                 <HotSlices hotSlices={hotSlices} />
            </HomePageGrids>
        </div>
    )
}

export default HomePage 


/*
    Page query: 
        - can be dynamic with variables
        - can only be run on a top level page

    Static query:
        - can not be dynamic, no variables can be passed in
        - can be run anywhere

*/