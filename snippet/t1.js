// 1.下划线转换为驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    })
}


// 2.驼峰转换为下划线
function toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 3.axios下载流文件
axios({
    method: "get/post",
    url: "xxx",
    data: data,
    responseType: "blob"
}).then(res => {
    let blob = new Blob([res.data / xxxx], {
        type: "application/vnd.ms-excel"
    })
    // 获取name
    let tempName = res.headers['content-disposition'].split(";")[1].split("filename=")[1]
    // 动态创建a标签下载
    const link = document.createElement("a")
    link.style.display = "none"
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", decodeURIComponent(tempName))
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})



// 4.格式化对象(过滤字符)
function filterObj(obj) {
    let new_obj = {}
    if (obj === "" || obj === null || obj === undefined) return new_obj;
    for (let i in obj) {
        if (Object.prototype.toString.call(obj[i]) === '[object Object]') {
            new_obj[i] = filterObj(obj[i])
        } else if (obj[i] !== "" && obj[i] !== null && obj[i] !== undefined) {
            new_obj[i] = obj[i];
        }
    }
    return new_obj;
}
let obj = {
    a: 1,
    b: 2,
    c: {
        name: "张三",
        age: ""
    },
    d: "",
    e: null
}
console.log('最终结果', filterObj(obj))


// 5.es6去重简单的数据
let templ = [...new Set([1, 1, 2, 2, 3, 3])]
let templ2 = Array.from(new Set([1, 1, 2, 2, 3, 3]))

// 6.二维数组简化为一维数组
let flats = [
    [1, 2],
    [3, 4]
].flat();

// 7.根据数字生成对应的数组
let arr1 = Array.from({
    length: 30
}, (v, k) => k + 1)
let arr2 = Array.from(Array(30), (v, k) => k + 1)
let arr3 = new Array(30).keys()
Array.from(arr3, item => item + 1)

// 8.快速生成英文26字母
//upper
export const upperLetter = Array.from({
    length: 26
}, (_, index) => String.fromCodePoint(65 + index))
//lower
export const lowerletter = Array.from({
        length: 26
    }, (_, index) =>
    String.fromCodePoint(97) + index)


// 9.生成两位整数之间的随机数(包括两端的整数)
export function randomB(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 10.生成两位整数之间的随机数(不包括两端的整数)
export function randomB(min, max) {
    min += 1, max -= 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 11.通过Object.fromEntries获取URL的传参
let url = "?id=123&name=jack";
Object.fromEntries(new URLSearchParams(url))

/**
 * 12.递归实现深拷贝
 * a.数组对象暂没考虑
 * b.如对象中有undefined则不会拷贝此内容
 * */ 
export function deepClone(source){
    let target;
    if(Object.prototype.toString.call(source) === '[object Object]'){
        target = Array.isArray(source) ? [] : {}
        for(let key in source){
            if(source.hasOwnProperty(key)){
                if(Object.prototype.toString.call(source[key]) != '[object Objext]'){
                    target[key] = source[key]
                }else{
                    traget[key] = deepClone(source[key])
                }
            }
        }
    }else{
        target = source
    }
    return target;
}


//13.解构数组对象嵌套
let arr = [
    {
        name:"name1",
        id:1,
        children:[
            {
                name:'name11',
                id:2            
            },
            {
                name:'name12',
                id:3            
            }        
        ]    
    },
    {
        name:"name2",
        id:4,
        children:[
            {
                name:'name21',
                id:5            
            }        
        ]    
    },
    {
        name:"name3",
        id:6,
        children:[
            {
                name:'name31',
                id:7,
                children:[
                    {
                        name:'name31-1',
                        id:8                    
                    }                
                ]            
            }        
        ]    
    },
    {
        name:'name4',
        id:9    
    }
]
export function flatten(arr){
    return [].concat(...arr.map(item=>[].concat(item,...flatten(item.children?item.children:[]))))
}

// 14.封装axios基于iview-admin模式封装
import axios from 'axios';
let LoadingInstanceURl={};
class httpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getInsideConfig(obj){
        const config = {
            baseURL:this.baseUrl,
            timeout:3 * 60 *1000,
            headers:{}
        }
        return config;
    }
    interceptors(instance,url){
        instance.interceptors.request.use(config=>{
            // 自定义请求参数.....
            if(!config.noLoading){
                LoadingInstanceURl[url] = true;
            }
            if(LoadingInstanceURl[url]){
                // 开启弹窗显示
            }
            return config;
        },error=>{
            return Promise.reject(error)
        })

        instance.interceptors.response.use(resp=>{
            // 添加自定义的数据处理条件
            return resp;
        },error=>{
            let errorInfo = error.response;
            switch(errorInfo){
                case 404:
                    // xxxxx
                    break;
            }


            return Promise.reject(error);
        })
    }
    request(options){
        const instace = axios.create();
        options = Object.assign(this.getInsideConfig(),options);
        this.interceptors(instace,options.url)
        return instace(optons)
    }

}

export default httpRequest;