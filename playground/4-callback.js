
// we cant make return in setTimeout bc of what weve learnt b4, so we use call back function 
// const add = (x,y,callback) =>{
//     setTimeout(()=>{
//         callback(x+y)
//     },2000)
// }

// add(1,4,(sum)=>{
//     console.log(sum)
// })

const doWorkCallback = (callback)=>{
    setTimeout(()=>{
        //callback('this is my error', undefined)
        callback(undefined, [1,2,3])
    },2000)
}

doWorkCallback((error, result)=>{
    if(error) {
        return console.log(error)
    }
    console.log(result)
})