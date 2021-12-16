//函数   参数约束 z可选参数必须最后一个,默认值也是可选参数，返回值约束

// 函数声明
function add(x:number,y:number, z ?:number,a :number = 10) : number{
    return x+y;
}

//函数表达式
let add2 = function(x:number,y:number, z ?:number,a :number = 10) : number{
    return x+y;
}
//方法赋值 add3 : (x:number,y:number, z ?:number)=> number 声明函数的类型 即 add3的类型与 add 一样
let add3 : (x:number,y:number, z ?:number)=> number = add ;