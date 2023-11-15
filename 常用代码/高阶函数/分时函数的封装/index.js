const btn = document.querySelector('.btn');
const datas = Array.from({length: 10000},(_,i)=>i);
// 任务分段执行
const perforChunk=(data,taskHandler,scheduler)=>{
    if (typeof data === 'number') data = {length:data}
    if (data.length === 0) return;
    let i=0;
    //执行下一块任务  idle.timeRemaining
    function _run(){
        if(i >= data.length) return;
        //浏览器渲染帧（16.6ms）空闲时间
        scheduler((isGoOn)=>{
           const remainTime = isGoOn();
           while(remainTime>0 && i<data.length){
            taskHandler(datas[i],i)
            i++;
           } 
         _run();
        })
    }
    _run();
}
const task= (data, index) =>{
    const div = document.createElement('div');
    div.textContent = index;
    document.body.appendChild(div);
}
const scheduler=(cb)=>{
    requestIdleCallback((idle)=>{
        cb(()=> idle.timeRemaining() > 0);//渲染帧剩余时间；
    })
}
btn.addEventListener('click',()=>{
    perforChunk(datas,task,scheduler)
})

// const browserPerformChunk=(datas,taskHandler)=>{
//     const scheduler=(cb)=>{
//         requestIdleCallback((idle)=>{
//             cb(()=>idle.timeRemaining() > 0);//渲染帧剩余时间；
//         })
//     }
//     perforChunk(datas,task,scheduler)
// }