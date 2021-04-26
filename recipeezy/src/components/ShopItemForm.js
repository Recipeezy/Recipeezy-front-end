import React, { useState } from 'react'
import axios from 'axios'
export default function ShopItemForm({addShopItem, token}) {
    const [name, setName] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                'https://recipeezy-app.herokuapp.com/shopping_list/add/',
                {
                    name: name
                },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            )
            .then((data) => {
                addShopItem(data.data)
            setName('')
            })
    }
    return (
        <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='item-name'></label>
                    <input
                        id='item-name'
                        type='text'
                        value={name}
                        placeholder='Add Item'
                        onChange={(event) => setName(event.target.value)}
                    ></input>
                </div>
                <div className='btn'>
                <button
                    className='submit-btn'
                    type="submit"
                >Add</button>
                </div>
                </form>
    )
}