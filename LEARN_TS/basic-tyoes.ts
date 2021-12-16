let isBoole:Boolean = true;

let isNum:Number = 1;
let n:null = null;


//任意类型 和 联合类型
let notsure:any = 4||'112'||true;
let numOrString: Number | String = 3 || 'adc' ;

// 数组和元组
let arrOfNumber : number[] = [1,2,3,3]
function ts(){
    console.log(arguments);
    let arg :IArguments = arguments;   //类数组有专门的接口
}
let user:[string,number] = ['viking',1]  //元组。限定数组的个数和数据类型





