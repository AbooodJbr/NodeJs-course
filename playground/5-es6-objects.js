// 1 - objects property shorthand
const name = 'abood'
const myAge = 19

const user = {
    name, // a shorthand for {name : name} 
    age : myAge, //we cant use the shorthand {age : myAge} bc they have different names
    location : 'Nablus'
}
//the shorthand above works only when we have the same name for the variables


console.log(user)

// 2 - OBJECT DESTRUCTING
const product = {
    label : 'Red Notebook',
    price : 3,
    stock : 201,
    salePrice : undefined
}

// instead of using this way to destruct :
// const label = product.label  --> 'Red Notebook'
// const stock = product.stock  --> 201

//we use this way 
const {label : productLabel, stock = 300, rating, salePrice = 2} = product
// it takes variables with the same name in the object (already exists) 
// if it doesnt exist it gives 'undefined' value
// we can rename it when destructering like we did with label, we cant use label now but we can use product label
// we can give default value so that when it doesnt exist in the object it takes that value, 
    //and if theres already a value it takes the value in the object
// if we put default value to existing variable but with undefined value like 'salePrice' it takes the default value we put
//---------EXAMPLE----------
console.log(productLabel) // 'Red Notebook' 
console.log(stock) //201
console.log(rating) //undefined
console.log(salePrice) //2

