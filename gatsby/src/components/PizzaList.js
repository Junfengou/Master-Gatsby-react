import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';


const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px; //specify the row so that everything is line up nicely with the pizza name, description, and the picture
`;

const PizzaStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the pizzaStyles div, but from the  PizzaGridStyles grid 
        - subgrid: basically take the grid specified from parent element which in this case is the grid defined in PizzaGridStyles
  */
  @supports not (grid-template-rows: subgrid) {
      //At the time watching, chrome does not support subgrid
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.name}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}

export default PizzaList;


/*
    side note: 
        Often time images takes a long time to load, that is caused my various of reasons. 
       - image on the site is too big
       - image not compressed
       - image not the same within height
       - image poor loading performance or not the right format

    Gatsby will take the image from the user and deliver a "gatsby image" 
        - takes care ratio
        - data image
        - shows the blurry version of image while it's downloading in the background
        
    Services for images:
        - Sanity Image Pipline
        - Cloudinary
        - Imgix

*/

// <Link to={`/pizza/${pizza.name}`}>