// json 实现
function cloneOfJSON(obj){
    return JSON.parse(JSON.stringify(obj))
}

// 手写实现
function myClone(obj){
    if(!obj&& typeof obj !== 'object') return ;
    let newObj = Array.isArray(obj)?[]:{};
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = typeof obj[key] == 'object' ? myClone(obj[key]):obj[key];
        }
    }
    return newObj;
}