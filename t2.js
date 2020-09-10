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
export const insertStr = (soure,index,newStr)=>{
    let str = soure.slice(0,index)+ newStr + soure.slice(index);
    return str;
}


/**
 * 上移下移(vue版本通过数据splice进行上移下移)
 * (可操作DOM的直接操作DOM进行移动)
 * 1、index移动的下标,item移动的内容
 * 2、list最终的数据
 * */ 
export const MoveUp = ()=>{
    this.list.splice(index - 1,0,item);
    this.list.splice(index + 1,1);
}

export const MoveDown =(index,item)=>{
    this.list.splice(index + 2, 0, item)
    this.list.splice(index,1)
}