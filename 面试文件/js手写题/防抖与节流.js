
//防抖
function debounce(fn,wait){
    let timer = null;
    return function(){
        let context = this;
        let args = arguments;
        if(timer){
            clearTimeout();
        }
        setTimeout(function(){
            fn.apply(context,args);
        })
    }
}
//节流 时间戳
function throttle(fn,delay){
    var oldTime = Date.now();
    return function(){
        var context = this;
        var args = arguments;
        var newTime = Date.now();
        if(newTime - oldTime < delay){
            fu.apply(context,args)
            oldTime = Date.now()
        }
    }
}

//节流 定时器
function throttle(fn,delay){
    let timer = null;
    return function(){
        let context = this;
        let args = arguments;
        if(!timer){
            timer =  setTimeout(function(){
                fn.apply(context,args)
                timer = null;
            },delay)
        }
    }
}

