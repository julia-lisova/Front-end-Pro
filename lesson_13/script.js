const obj = {
    x: 10,
    y: 20,
    inner: {
        x: 20,
        z: 30
    },
    foo2: {
        k: 23,
        p: 13
    }
} 

// без зміни оригінального об'єкта
const convert1 = (object) => 
     Object.entries(object).reduce((total, current) =>
             Object.assign(total, (typeof current[1] === 'object')
                ? current[1]
                : Object.fromEntries([current])
    ), {});

// зі зміною оригінального об'єкту
const convert2 = (object) => {
    let clone={};

    for(let key in object){
        if (typeof object[key] === 'object'){
            clone = Object.assign(object, object[key]);
            delete object[key];
        }
    }
    return clone;
}

console.log(convert1(obj));
console.log(convert2(obj));
