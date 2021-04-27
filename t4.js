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
    let permissionList = [],permissions = [];
    let storageData = sessionStorage.getItem("AUTH_LIST");
    let authList = JSON.parse(storageData)??[];
    for(let auth of authList){
        permissionList.push(auth);
    }
    if(!permissionList.length){
        el.parentNode.removeChild(el);
        return;
    }

    for(let item of permissionList){
        // permissions.push(item.xxxxx)
        permissions.push(item.permission);
    }

    if(!permissions.includes(binding.value)){
        el.parentNode.removeChild(el);
    }
}

export default hasPermission;

// -----main.js

import hasPermission from '@/utils/hasPermission.js'
Vue.use(hasPermission);

// xxxx.vue
<el-button v-has="car:info:add"></el-button>


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

let plants1 = [
    {
        name:"sale"
    },
    {
        name:"Uray"
    },
    {
        name:"Venus"
    },
    {
        name:"Mesh"
    }
]

let wName = Array.from(plants1,item=>item.name)
console.log(wName)


// 快速生成超链接
let a = '超链接'.link('http://www.google.com')
console.log("快速生成超链接==>",a)

// RGB to Hex
function RGBtoHEX(rgb){
    return ((1<<24) + (rgb.r<<16) + (rgb.g<<8) + rgb.b).toString(16).substr(1);
  }

// 金钱格式化
let money = 12342123;

// mth1
money.toLocaleString('en-US');
// mth2
Intl.NumberFormat().format(money);
// mth3
String(money).replace(/\B(?=(\d{3})+(?!\d))/g,",");