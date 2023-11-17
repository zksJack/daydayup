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
            taskHandler(data[i],i)
            i++;
           } 
         _run();
        })
    }
    _run();
}
// 固定时间任务分段执行
const browserPerformChunk=(datas,taskHandler)=>{
    const scheduler=(cb)=>{
        requestIdleCallback((idle)=>{
            cb(()=>idle.timeRemaining() > 0);//渲染帧剩余时间；
        })
    }
    perforChunk(datas,taskHandler,scheduler)
}