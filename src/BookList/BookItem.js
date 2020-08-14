import React from 'react';
import './BookItem.css';

export default function BookItem(props) {
    return (
        <div className='bookItem__container'>
            <h3>{props.title}</h3>
            <img src={props.src} alt=''/>
            <p id='book__description'>{props.description}</p>
        </div>
    )
}