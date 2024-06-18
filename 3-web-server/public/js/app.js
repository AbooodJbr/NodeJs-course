console.log('client side')
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




//fetch is used in async functions so if we need to store it in var we should use await first like this : 

const getData = async (loc) => {
    const url = "http://localhost:3000/weather?address=" + encodeURI(loc)
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data
}

const form = document.getElementById('search')
const loc = document.getElementById('loc')
const m1 = document.getElementById('m1')
const m2 = document.getElementById('m2')

// form.addEventListener('submit', (e)=>{
//     console.log(loc.value)
//     const data = getData(loc.value)
//     m1.innerText(data.address)
//     m2.data.innerText(data.forecast)
//     e.preventDefault()
// })
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log(loc.value)
    const data = await getData(loc.value); // Wait for the async function to resolve
    if(data.len===0) { m1.innerText('unable to find location, try again please') }
    else {
    m1.innerText = data.location; // Set the inner text directly
    m2.innerText = data.forecast; // Set the inner text directly
}
})