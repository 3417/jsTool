let request = require('request');
let fs = require('fs');
let data = []; //获取到的图片数据
let async = require("async");

// 获取下载图片的数组对象
function ImgList() {
    let arr = [];
    // for (let i = 0; i < data.length; i++) {
    //     let temp = data[i].item_children
    //     for (let j = 0; j < temp.length; j++) {
    //         let filename = temp[j].img_src.split('./img/')[1];
    //         let url = `https://nav.web-hub.cn/${temp[j].img_src.split('./')[1]}`;
    //         let obj = {
    //             filename,
    //             url
    //         }
    //         arr.push(obj);
            
    //     }
    // }
    return arr;
}

// 下载图片
async function download(){
    let imgList = await ImgList();
    async.mapSeries(imgList,function(item, callback){
        setTimeout(function(){
            downloadPic(item.url, `./images/${item.filename}`);
            callback(null, item);
        },400);
    }, function(err, results){});
}

// 写入图片
let downloadPic = function(src, dest){
    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        console.log('pic saved!')
    })
}

// 执行
download();