// 泛型

function echo<T> (arg:T) :T{
    return arg

}
const result = echo('123')

function swap<T,U>(tuple:[T,U]):[T,U]{
    return [tuple[0],tuple[1]]
}
const result1 = swap(['string',123])

//约束泛型
interface IWIthLength{
    length:number;

}
function echoOFArr<T extends IWIthLength> (arg:T):T{
    console.log(arg.length)
    return arg;
}
const str = echoOFArr('str')
const str1 = echoOFArr(['1'])
const str2 = echoOFArr({length:1})

//类和接口使用泛型

class Queue<T>{
    private data =[];
    push(item:T){
        return this.data.push(item)
    }
    pop():T{
        return this.data.shift()
    }
}

const queue = new Queue<Number>();
queue.push(1);
queue.push(2);
console.log(queue.pop().toFixed())


interface keyPair<T,U>{
    key:T,
    value:U
}
let kpi : keyPair<number,string> ={key:123,value:"123"}
let kp1 : keyPair<string,string> ={key:'123',value:"123"}

interface IPlus<T>{
    (a:T,b:T):T;
}
function plus(a:number,b:number):number{
    return a+b;
}

const a:IPlus<number> =plus;