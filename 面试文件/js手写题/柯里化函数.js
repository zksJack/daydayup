// 普通写法
function curry(fn , ...args){
    const length = fn.length;
    var _this = this;
    args = args || [];
    return function(){
        args = [...args,...arguments];
        if(args.length < length){
            return curry.call(_this,fn,...args);
        }
        return fn(...args);
    }
}

//ES6写法

/**
 * 
 * @param {*} fn 
 * @param  {...any} args 
 * @returns 
 * 
 * curry.bind(null,fn,...args)的解释:
 * 如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。
 * bind() 的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。
 * 当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
 */
function curryES6(fn,...args){
    return fn.length <= args.length ? fn(...args):curryES6.bind(null,fn,...args);
}

//测试用例
const fn = (a,b,c,d)=>a+b+c+d;

console.log(curry(fn,1)(6)(2)(3))
console.log(curryES6(fn,1)(2,3)(3))