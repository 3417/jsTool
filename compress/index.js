/**
 * canvas压缩图片版本
 * 
 */

// 将上传的_file文件流通过FileReader转化成base64  quality：图片的质量
export const fileToBase64ByQuality = (file, quality = 0.92) => {
    let fileReader = new FileReader();
    let type = file.type;
    return new Promise((resolve, reject) => {
        if (window.URL || window.webkitURL) {
            resolve(compress(URL.createObjectURL(file), quality, type))
        } else {
            fileReader.onload = () => {
                resolve(compress(fileReader.result, quality, type))
            }
            fileReader.onerror = (e) => {
                reject(e)
            }
            fileReader.readAsDataURL(file);
        }
    })
}

// 压缩重绘图片
const MAX_WIDTH = 800;
export const compress = (base64, quality, mimeType) => {
    let cvs = document.createElement('canvas');
    let img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    return new Promise((resolve, reject) => {
        img.src = base64
        let offetX = 0;
        img.onload = () => {
            if (img.width > MAX_WIDTH) {
                cvs.width = MAX_WIDTH;
                cvs.height = img.height * MAX_WIDTH / img.width;
                offetX = (img.width - MAX_WIDTH) / 2
            } else {
                cvs.width = img.width;
                cvs.height = img.height;
            }
            let ctx = cvs.getContext('2d').drawImage(img, 0, 0, cvs.width, cvs.height);
            let imgData = cvs.toDataURL(mimeType, quality);
            resolve({
                base64,
                cbase64: imgData,
                blob: convertBase64UrlToBlob(imgData, mimeType)
            });
        }
    })
}

// base64数据转换成blob文件流
export const convertBase64UrlToBlob = (base64, mimeType) => {
    let bytes = window.atob(base64.split(',')[1])
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    let _blob = new Blob([ia], {
        type: mimeType
    })
    return _blob;
}