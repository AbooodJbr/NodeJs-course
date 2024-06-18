const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve([1,2,3]) //success

        //reject
        reject('things went wrong')
    },2000)
})

doWorkPromise.then((result)=>{ //this runs when things go well, if it runs the error/catch dont run
    console.log('success!', result)
}).catch((error)=>{//this runs when theres an error without success 
})

//so when we work with promises we use 2 seperate functions to work with them (then().catch())

const add=(a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

add(1,2).then((sum)=>{
    console.log(sum) //comes after 2 sec
    add(sum,5).then(sum2=>{
        console.log(sum2) //after 2 + 2 secs
    }).catch(e=>{
        console.log(e)
    })
}).catch(e=>{
    console.log(e)
})


add(1,1).then(sum=>{
    console.log(sum)
}).then(sum2=>{
    
})
