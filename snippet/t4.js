/**
 * 1.动态绑定属性名
 * */

const dynamic = "flavour";
let item = {
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

["contextmenu", "selectstart", "copy", "dragstart"].forEach(function (ev) {
    document.addEventListener(ev, function (ev) {
        ev.preventDefault();
        ev.returnValue = false;
    })
})


// 网页也可以带事件的桌面通知

function doNotify(title, options = {}, events = {}) {
    const notification = new Notification(title, options);
    for (let event in events) {
        notification[event] = events[event];
    }
}

function notify(title, options = {}, events = {}) {
    if (!("Notification" in window)) {
        return console.error("This browser does not support desktop notification");
    } else if (Notification.permission === 'granted') {
        doNotify(title, options, events);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                doNotify(title, options, events);
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


function dropright(arr, n = 0) {
    return n < arr.length ? arr.slice(0, arr.length - n) : [];
}

// 返回数组下标的间隔nth的元素

function everNth(arr, nth) {
    return arr.filter((v, i) => i % nth === nth - 1);
}

// 判断页面是否隐藏
const ishidden = () => !document.hidden //true-展示  false-隐藏


// 滚动获取坐标
export const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})


// 洗牌算法
export const shuffle = (arr) => {
    let result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random]);
        arr.splice(random, 1);
    }
    return result;
}

// 拦截粘贴板
export const copyTextToClipboard = (value) => {
    let textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        let successful = document.execCommand('copy')
    } catch (err) {
        console.log('Oops,unable to copy')
    }
    document.body.removeChild(textArea);
}

// 前端身份证验证
export const isCardId = (sId) => {
    let reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/
    if (!reg.test(sId)) {
        console.log("你输入的身份证长度或格式错误")
        return false;
    }
    let aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
        console.log('你的身份证地区非法')
        return false;
    }
    // 出生日期验证
    let sBirthday = (`${sId.substr(6,4)}-${Number(sId.substr(10,2))}-${Number(sId.substr(12,2))}`).replace(/-/g, "/");
    let d = new Date(sBirthday);
    if (sBirthday != (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) {
        console.log('身份证上的出生日期非法');
        return false;
    }
    // 身份证号码验证
    let sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432";
    for (let i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
    }
    let last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
        console.log("你输入的身份证号非法")
        return false;
    }
    return true;
}


// 将阿拉伯数字翻译成中文的大写数字
export const numberToChinese = (num) => {
    let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    let BB = new Array("", "十", "百", "仟", "萬", "億", "点", "")
    let a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                let reg = new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                if (!reg.test(a[0])) {
                    re = BB[4] + re
                }
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        let flag = k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0;
        if (flag) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) {
        re += BB[6];
        for (let i = 0; i < a[1].length; i++) {
            re += AA[a[1].charAt(i)];
        }
    }
    if (re == '一十') {
        re = "十"
    }
    if (re.match(/^一/) && re.length == 3) {
        re = re.replace("一", "");
    }
    return re;
}


// 将数字转换未大写金额
export const changeToChinese = (Num) => {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {
        Num = new String(Num);
    };
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
    };
    //字符处理完毕后开始转换，采用前后两部分分别转换
    let part = String(Num).split(".");
    let newchar = "";
    //小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若数量超过拾亿单位，提示
        }
        let tmpnewchar = ""
        let perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        let newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}


// 数组排序
export const sort = (arr, type = 1) => {
    return arr.sort((a, b) => {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}

// 删除其中的一个元素
export const remove = (arr, ele) => {
    let index = arr.indexOf(ele);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

/**
 * 去除空格 type
 * 1.所有空格
 * 2.前后空格
 * 3.前空格
 * 4.后空格
 * */

export const trim = (str, type) => {
    type = type || 1;
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

// 字符转换
// type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
export const changeCase = (str, type) => {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                } else {
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

// 检查密码强度
export const checkPwd = (str) => {
    let Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}

// 追加URL参数(有待验证)
export const appendQuery = (url,key,value)=>{
    let options = `${key}=${value}`;
    if(url.includes('?')){
        url+='&'+options
    }else{
        url+='?'+options
    }
    return url;
}