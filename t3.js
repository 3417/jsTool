// 1、计算数组中某个值出现的次数
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a + 0), 0);
countOccurrences([1,1,1,1,2,2,2,2,3,4],1) 


// 2、检测设备类型
const detectDeviceType = ()=>{
    return /Android|webOS|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' :'Desktop'
}

// 3、重定向到URL
const redirect = (url,asLink = true)=>{
    return asLink ? (window.location.href = url) : window.location.replace(url)
}


// 4、回到顶部
const scrollToTop = ()=>{
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if(c > 0){
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0,c - c / 8);
    }
}

// 5、柯里化
const curry = (fn,arity = fn.length, ...args)=>{
    return arity <= args.length ? fn(...args) : curry.bind(null,fn,arity,...args);
}

curry(Math.pow)(2)(10); // 1024
curry(math.min,3)(10)(50)(2); //2

// sleep 休眠，延迟执行异步函数
const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms));

async function sleepyWork(){
    console.log('sleep for 1 second');
    await sleep(1000);
    console.log('I woke up after 1 second');
}