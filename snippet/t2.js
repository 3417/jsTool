// 1.数组求交集和差集
let a = new Set([1, 2, 3, 4])
let b = new Set([4, 5, 6, 7])

new Set([...a].filter(x => b.has(x))) // 交集（都是已a开始的）
new Set([...a].filter(x => !b.has(x))) // 差集（都是已a开始的）

// 2.删除两个数组中相同的数据(根据某个字段)
let arr1 = [{
    id: '1',
    name: 'json'
}, {
    id: '2',
    name: 'book'
}]
let arr2 = [{
    id: '1',
    name: 'json',
    age: '15'
}, {
    id: '2',
    name: 'book',
    age: '16'
}, {
    id: '3',
    name: 'ani',
    age: '17'
}]
//ES6的方法
let add = arr2.filter(item => !arr1.some(ele => ele.id === item.id));
console.log(add)

// 3.替换数组中的某个对象(根据某个字段)
let arr = [{
        id: 1,
        name: "test"
    },
    {
        id: 2,
        name: "test1"
    },
    {
        id: 3,
        name: "test2"
    },
]
let obj = {
    id: 2,
    name: "hahah"
}
arr = arr.map(item => item.id === obj.id ? obj : item)

// 4.根据某个字段进行匹配归类
let data = []; //OR data = {}
for (let i = 0; i < res.length; i++) {
    if (data[res[i].xxxx]) {
        let temp = [];
        temp.push(res[i]);
        data[res[i].xxxx] = temp;
    } else {
        data[res[i].xxxx].push(res[i])
    }
}

// 5.拼接数据到url后面
function isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function splicObj(obj) {
    // 如果不是对象返回null
    if (!isObj) {
        return null;
    }
    // 如果是对象
    const URL = Object.keys(obj).reduce((item, index) => {
        if (obj[index]) {
            item.push(index + '=' + obj[index])
        }
        return item;
    }, []).join("&");
    return URL;
}

let url = `?${splicObj({name:'张三',age:22})}`


// 6.通过身份证判断年龄
// 校验身份证
const validIDCard = (cid) => {
    const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    if (/^\d{17}\d|x$/i.test(cid)) {
        let sum = 0;

        for (let i = 0; i < cid.length - 1; i++) {
            // 对前17位数字与权值乘积求和
            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）
        const idx = sum % 11;
        // 检验第18为是否与校验码相等
        return `${arrValid[idx]}` === cid.substr(17, 1).toUpperCase();
    }
    return false;
};
//  通过身份证判断年龄
const getAgeByIdCard = (idcard) => {
    if (!this.validIDCard(idcard)) {
        return null;
    }

    return (new Date()).getFullYear() - parseInt(idcard.substring(6, 10), 10);
};

// 7、判断那一年是否是闰年
const isLeapYear = (year) => {
    return year % 4 === 0 && yeat % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0);
}

// 8.判断页面的底部是否可见
const bottomVisible = () => {
    document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight
}

// 9.获取滚动条的位置
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})


// mask 遮蔽数字
const mask = (cc, num = 4, mask = '*') =>
    ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);


//   在字符串中插入新的字符串
export const insertStr = (soure, index, newStr) => {
    let str = soure.slice(0, index) + newStr + soure.slice(index);
    return str;
}


/**
 * 上移下移(vue版本通过数据splice进行上移下移)
 * (可操作DOM的直接操作DOM进行移动)
 * 1、index移动的下标,item移动的内容
 * 2、list最终的数据
 * */
export const MoveUp = () => {
    this.list.splice(index - 1, 0, item);
    this.list.splice(index + 1, 1);
}

export const MoveDown = (index, item) => {
    this.list.splice(index + 2, 0, item)
    this.list.splice(index, 1)
}

/**
 * 获取浏览器的版本
 * */


export const getBower = () => {
    let sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}

/**
 * 获取操作系统
 * */ 
export const getOS = ()=>{
    let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
}

/**
 * TODO:获取某一年是否平年或者闰年(已重复)
 * 如果未传值，则获取当前的年份是否是闰年或平年
 * */ 

export const getLeapYear = (year)=>{
     oYear = year??new Date().getFullYear();
    (oYear % 4 == 0 && oYear % 100 != 0) || oYear % 400 == 0 ? '闰年' :'平年'
}

/**
 * (来源：outils前端工具库)
 * @desc H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {Function} upCb 当软键盘弹起的回调
 */

 export function windowResize(downCb, upCb) {
	var clientHeight = window.innerHeight;
	downCb = typeof downCb === 'function' ? downCb : function () {}
	upCb = typeof upCb === 'function' ? upCb : function () {}
	window.addEventListener('resize', () => {
		var height = window.innerHeight;
		if (height === clientHeight) {
			downCb();
		}
		if (height < clientHeight) {
			upCb();
		}
	});
}