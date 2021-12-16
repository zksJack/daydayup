//类对象  封装 继承 多态

class Animal {
    name:string;
    constructor(name:string){
        this.name = name;
    }
    run(){
        return `${this.name}跑起来了`
    }
}
const a = new Animal('张冰洁');
console.log(a.run())


//继承
class dog extends Animal{
    bark(){
        return `${this.name} is barking`
    }
}
const xiao = new dog('涨价')
console.log(xiao.run())

//重写

class cat extends Animal{
    constructor(name:any){
        super(name);
    }
    run(){
        return `${this.name} 渺跑`
    }
}
const ca = new cat('zbj')
console.log(ca.run())           

// 修饰符
// public private property 共有 私有 受保护    readonly 只读 static 静态属性

// 接口
interface Redio{
    swichRido(tig:true):void;
}

interface Battery extends chexk{
    checkBattery():void;
}
interface chexk{

}
class car implements Redio,Battery{
    checkBattery() {
        throw new Error("Method not implemented.");
    }
    swichRido(){

    }
}

class phone implements Redio{
    swichRido(){

    }
}