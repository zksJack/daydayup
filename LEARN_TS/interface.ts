// interface 接口  对对象的形状进行描述，对类进行抽象 ，鸭子类型（Duck typing）
interface person{
    name:string ,
    age?:number, //加问号是可选属性
    readonly id:number;  //readonly 初始化定义属性 不可以更改
}
let Viking:person={
    id:1,
    name:'adsad',
    age:20,
}


