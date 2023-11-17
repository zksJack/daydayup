//初始化数据
const currentIndex = 100;//当前播放的视频下标；
const SIZE=30;//每页视频的数量；
const container =document.querySelector(".container");
const indicator = document.querySelector(".indicator");
const visibleIndex =new Set(); //可见元素的下标集合;
const liadedPages = new Set();// 已加载过的页码;
const btn = document.querySelector(".imgBtn");

//创建观察器，用于观察元素是否进入视口
const observer = new IntersectionObserver((entries)=>{
  for(let entry of entries){
    const index = entry.target.dataset.index;
    if(entry.isIntersecting){
      visibleIndex.add(index);
    }else{
      visibleIndex.delete(index);
    }
  }
  loadPagesDebounce();
  setIndicatorVisible();
})
//获取可见元素的最小下标和最大下标
const getRange = ()=>{}
//创建指定页数所包含的元素
const createElement = (page)=>{
  const childrenLen = container.children.length;
  const count = page * SIZE;
  for (let i = childrenLen; i < count; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.index = i;
    if(i===currentIndex){
      item.classList.add('playing');
    }
    container.appendChild(item);
    observer.observe(item)
  }
}
createElement(1);//初始创建一页；

const loadPage = (page)=>{
  const [minIndex,maxIndex]= getRange(page);
  const pages= new Set();
  for(let i = minIndex;i<=maxIndex;i++){
    pages.add(Math.ceil((i+1)/SIZE));
  }
  for(const page of pages){
    if(loadPages.has(page)) continue;
    loadPages.add(page);
    $.get('http://127.0.0.1:3000/b/getFiles',function(result){
      const startIndex = (page-1)*SIZE;
      for(let i = 0;i<result.length ;i++){
        const item = container.children[startIndex+i];
        item.innerHTML =`<img src="./img/${result[i]}" alt="">`;
      }
    })
  }
}
const debounce=(fn,delay)=>{ 
  let timer = null;
  return function(){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.apply(this,arguments);
    },delay);
  }
}
const loadPagesDebounce = debounce(liadedPages,500);

//设置指示器是否可见
const setIndicatorVisible = ()=>{
  const [minIndex,maxIndex] = getRange(currentPage);
  indicator.style.display =currentIndex>=minIndex&&currentIndex<=maxIndex?'none': 'block';
}
loadPage();
//点击获取图片
const taskHandler = (data)=>{
    const li = document.createElement('li');
    li.innerHTML = `<img src="./img/${data}" alt="">`;
    $("ul").append(li);
}
btn.addEventListener('click',()=>{
   $.get('http://127.0.0.1:3000/a/getFiles',function(result){
    browserPerformChunk(result,taskHandler) 
  })
})
//刚刚看过按钮
indicator.addEventListener('click',(e)=>{
  const page = Math.floor(currentIndex/SIZE)+1;
  createElement(page);
  container.children[currentIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  indicator.style.display = 'none';
});