import axios from 'axios'

export const pantryData = [
    {
        "id": 1,
        "item": 'steak',
        
    },
    {
        "id": 2,
        "item": 'eggs',
    },
    {
        "id": 3,
        "item": 'onions',
    },
    {
        "id": 4,
        "item": 'tomato',
    },
    {
        "id": 5,
        "item": 'mommys juice',
    },
    {
        "id": 6,
        "item": 'onions',
    },
]

// get data from api
export function getPantryData () {
    axios.get('url')
    .then((response) => 
        console.log(response)
    )
}
