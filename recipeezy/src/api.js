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
// // add new ingredient
// export function addNewFood () {
//     axios.post('url'),
//     {
//         id: id,
//         food: food,
//     },
//     .then((response) => {
//         if(response.data != null) {

//         }
//     })
// }



// const handleSubmit = (event) => {
//     console.log('handleSubmit running')
//     event.preventDefault()
//     axios
//         .post(
//         'http://swordtail.herokuapp.com/questions/',
//         {
//             title: title,
//             body: body,
//         },
//         {
//             headers: { Authorization: `Token ${token}`},
//         })
//         .then((response) => {
//             if(response.data != null) {
//                 alert('Your question was submitted!')
//                 setSubmitted(true)
//             }
//         })
//     }