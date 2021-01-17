import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
/*
    IMPORTANT SIDE NOTE:
        Any time you use a value field in any sort of custom Sanity input, you have to include Onchange field

        {set, unsest} passed in from sanity as PatchEvent will allow us to set or unset value depend on the conditions

        createPatchFrom() is only required if you want to create your own custom sanity input fields
*/

function createPatchFrom(value) {
    return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

//[Intl.NumberFormat] is built into the browser, great way to format money base on locale of the user
const formatMoney = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format;


// Input destructured. You can find it in the react dev tool by selecting the field you want to inspect
function PriceInput({ type, value, onChange, inputComponent }) {
    return (
        <div>
            <h2>{type.title}: {value ? formatMoney(value / 100 ) : ''}</h2>
            <p>{type.description}</p>
            <input type={type.name} value={value} onChange={e => onChange(createPatchFrom(e.target.value))} ref={inputComponent} ></input>
        </div>
    )
}

// exposing a focus method for sanity to run
PriceInput.focus = () => {
    this._inputElement.focus();
}

export default PriceInput
