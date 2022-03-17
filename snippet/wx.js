import { apiUrl } from './config.js';
const header = Object.create(null);
console.log('header=>', header)
let promiseUnsualQueue = [];  //token失效缓存当前请求
let isRefresh = true;


function addQue(callBack) {
    promiseUnsualQueue.push(callBack);
}

function implementQueue() {
    if (promiseUnsualQueue.length) {
        promiseUnsualQueue.map((params) => request(param[0], param[1], param[2]))
        promiseUnsualQueue = [];
        let page = getCurrentPages().pop() //获取当前的页面实例
        if (page == undefined || page == null) { return };
        page.onload();
        page.onshow();
        isRefresh = true;
    }
}

function request(method, url, params, isShowMsg = true) {
    wx.showLoading({
        title: '加载中',
        mask: 'true'
    })
    const { accessToken } = wx.getStorageSync('TOKEN') //获取相关用户的token（具项目而定）
    if (accessToken) {
        setHeader(accessToken);
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${apiUrl}${url}`,
            header,
            method,
            data: params,
            success: function (v) {
                wx.hideLoading();
                switch (v.statusCode) {
                    case 401:
                        
                        break;
                    case 712: //token失效，重新登录授权
                        addQue([method, url, params]) //添加到队列
                        if (isRefresh) {
                            wxLogin();
                        }
                        isRefresh = false;
                        break;
                    case 9999:
                        //后台接口报错的状态码
                        reject(v);
                        if (isShowMsg) {
                            wx.showToast({
                                title: res.msg,
                                icon: 'none',
                                duration: 2000
                            })
                        }    
                    default
                         resolve(v);
                        break;
                }
            },
            fail: function (_r) {
                wx.hideLoading();
                wx.showToast({
                    title: '请求出错',
                    icon: 'none',
                    duration: 2000
                })
                reject(_r);
            }
        })
    })
}


function wxLogin(){
    wx.setStorageSync('xxx',0)  //设置相关的凭证状态
    wx.login({
        success:function(res){
            if(res.code){
                let params = {
                    //后台需要的参数
                }
            }
            wx.request({
                url:`${apiUrl}/xxxx/xxxx`,  //后台给的登录接口
                header:{},
                method:'POST/GET',
                data:params,
                success:function(res){
                    //登录后的相关逻辑
                    setHeader(res.accessToken) //重新设置header
                    wx.setStorageSync('TOKEN',token) //设置相关请求数据
                    implementQueue() //执行之前缓存的请求
                }
            })
        }
    })
}

// 设置header
function setHeader(token){
    header['cookie'] = 'TOKEN='+token
}

export {
    setHeader,
    request
}

