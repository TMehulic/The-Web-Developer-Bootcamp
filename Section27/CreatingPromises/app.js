const fakeRequest = (url) => {
    return new Promise((resolve,reject)=>{
        const rand = Math.random();
        setTimeout(()=>{
            if(rand<0.7){
                resolve('Request success')
            }
            resolve('Request error.');
        },1000)
    })
}

fakeRequest('dogs/1')
    .then((data)=>{
        console.log("DONE WITH REQUEST");
        console.log('data is '+data);
    })
    .catch((err)=>{
        console.log("Error",err);
    })

const delayedColorChange = (newColor) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.body.style.backgroundColor=newColor;
            resolve();
        },3000)
    });
}

delayedColorChange('red')
    .then(() => delayedColorChange('blue'))
    .then(() => delayedColorChange('green'))