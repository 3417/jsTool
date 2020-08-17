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