const add=(a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a<0 || b<0)
            return reject('numbers must be non-negative')
            resolve(a+b)
        },2000)
    })
}

const doWork = async ()=>{
    const sum = await add(1,99)
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum,-3) //it will take 6 seconds
    return sum3
}

//if we dont return the function undefined is printing
//async function always return promise, await works with promise

doWork().then((result)=>{
    console.log('result', result)
}).catch((e)=>{
    console.log('e',e)
})

//why is async useful
//make it easier to work with promise codes


