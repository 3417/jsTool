/**
 * 1.动态绑定属性名
 * */

const dynamic = "flavour";
var item = {
    name: "Coke",
    [dynamic]: "Cherry"
}

console.log(item); //{ name: "Coke", flavour: "Cherry" }


/**
 * 权限--借鉴（掘金上的文章）
 * 
 * */


// ----hasPermission.js----
const hasPermission = {
    install: function (Vue, options) {
        Vue.directive("has", {
            inserted(el, binding, vnode) {
                filterGlobalPermission(el, binding, vnode)
            }
        })
    }
}

export const filterGlobalPermission = (el, binding, vnode) => {
    let permissionList = [],
        permissions = [];
    let storageData = sessionStorage.getItem("AUTH_LIST");
    let authList = JSON.parse(storageData) ? ? [];
    for (let auth of authList) {
        permissionList.push(auth);
    }
    if (!permissionList.length) {
        el.parentNode.removeChild(el);
        return;
    }

    for (let item of permissionList) {
        // permissions.push(item.xxxxx)
        permissions.push(item.permission);
    }

    if (!permissions.includes(binding.value)) {
        el.parentNode.removeChild(el);
    }
}

export default hasPermission;

// -----main.js

import hasPermission from '@/utils/hasPermission.js'
Vue.use(hasPermission);

// xxxx.vue
<
el - button v - has = "car:info:add" > < /el-button>


/**
 * WebSocket 完w3school建立一个IO链接
 * 
 * */

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


/**
 * 
 * Array.from()  遍历数组对象返回数据
 * 
 * */

let plants1 = [{
        name: "sale"
    },
    {
        name: "Uray"
    },
    {
        name: "Venus"
    },
    {
        name: "Mesh"
    }
]

let wName = Array.from(plants1, item => item.name)
console.log(wName)


// 快速生成超链接
let a = '超链接'.link('http://www.google.com')
console.log("快速生成超链接==>", a)

// RGB to Hex
function RGBtoHEX(rgb) {
    return ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).substr(1);
}

// 金钱格式化
let money = 12342123;

// mth1
money.toLocaleString('en-US');
// mth2
Intl.NumberFormat().format(money);
// mth3
String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// 基于atob和btoa的base64编码和解码

const utf8_tob64 = str => window.btoa(encodeURIComponent(str))

const b64_to_utf8 = str => decodeURIComponent(escape(window.atob(str)))

utf8_tob64('name is test') //bmFtZSUyMGlzJTIwdGVzdA==

b64_to_utf8('bmFtZSUyMGlzJTIwdGVzdA==') //name is test


// 相对地址转换为绝对地址
function realativeToAbs(href) {
    let aEl = document.createElement("a");
    aEl.href = href;
    const result = aEl.href;
    aEl = null;
    return result;
}


// 基于URL生成 UUID
function genUUID() {
    const url = URL.createObjectURL(new Blob([]));
    const uuid = url.substring(url.lastIndexOf('/') + 1);
    URL.revokeObjectURL(url);
    return uuid;
}

// promise  顺序执行
function runPromises(promiseCreators, initData) {
    return promiseCreators.reduce((promise, next) => promise.then((data) => next(data)), Promise.resolve(initData));
}

let promise1 = xxxx;
let promise2 = xxxx;

runPromises([promise1, promise2], 1).then(res => console.log(res));



// 滚动到顶部兼容PC和移动端
function scrollTop() {
    let scrollTop = document.scrollingElement;
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
}


// JS 禁止选择和复制和拖拽

["contextmenu", "selectstart", "copy","dragstart"].forEach(function (ev) {
    document.addEventListener(ev, function (ev) {
        ev.preventDefault();
        ev.returnValue = false;
    })
})


// 网页也可以带事件的桌面通知

function doNotify(title,options = {},events = {}){
    const notification = new Notification(title,options);
    for(let event in events){
        notification[event] = events[event];
    }
}

function notify(title,options ={},events ={}){
    if(!("Notification" in window)){
        return console.error("This browser does not support desktop notification");
    }else if(Notification.permission === 'granted'){
        doNotify(title,options,events);
    }else if(Notification.permission !== 'denied'){
        Notification.requestPermission().then((permission)=>{
            if(permission === 'granted'){
                doNotify(title,options,events);
            }
        })
    }
}

notify("中奖提示", {
    icon: "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f1a9f122e925aeef5e4534ff7f706729~300x300.image",
    body: "恭喜你，掘金签到一等奖",
    tag: "prize"
}, {
    onclick(ev) {
        console.log(ev);
        ev.target.close();
        window.focus();
    }
})


// 从右删除n个元素


function dropright(arr,n = 0){
    return n < arr.length ? arr.slice(0,arr.length - n) :[];
}

// 返回数组下标的间隔nth的元素

function everNth(arr,nth){
    return arr.filter((v,i)=>i % nth === nth - 1);
}