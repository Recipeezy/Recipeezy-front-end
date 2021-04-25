import React, { useState } from 'react'
import axios from 'axios'

export default function ShopListItem ({food}) {
    
    return (
        <li>
            <input
                type='checkbox'
                id={food.id}
                className='checkboxes'
                value={food.name}
                >
            </input>
            <label htmlForm={food.name}>{food.name}</label>
        </li>
    )
}