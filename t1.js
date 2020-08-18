// 下划线转换为驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    })
}


// 驼峰转换为下划线
function toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// axios下载流文件
// axios({
//     method: "get/post",
//     url: "xxx",
//     data: data,
//     responseType: "blob"
// }).then(res => {
//     let blob = new Blob([res.data / xxxx], {
//         type: "application/vnd.ms-excel"
//     })
//     // 获取name
//     let tempName = res.headers['content-disposition'].split(";")[1].split("filename=")[1]
//     // 动态创建a标签下载
//     const link = document.createElement("a")
//     link.style.display = "none"
//     link.href = URL.createObjectURL(blob)
//     link.setAttribute("download", decodeURIComponent(tempName))
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// })



// 格式化对象
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