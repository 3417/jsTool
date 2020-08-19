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



// 4.格式化对象
function filterObj(obj) {
    let new_obj = {}
    if(obj === "" || obj === null || obj === undefined) return new_obj;
    for (let i in obj) {
        if (Object.prototype.toString.call(obj[i]) === '[object Object]') {
            new_obj[i] = filterObj(obj[i])
        }else if (obj[i] !== "" && obj[i] !== null && obj[i] !== undefined) {
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
console.log('最终结果',filterObj(obj))


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
