import Confirmx from './confirm.vue'

let confirmBox = {}
confirmBox.install = function (Vue, options) {
    let ConfirmTpl = Vue.extend(Confirmx);
    let ConfirmBoxCheck;
    // 挂载元素到document.body上
    const MessageBoxInstance = () => {
        ConfirmBoxCheck = new ConfirmTpl();
        let tpl = ConfirmBoxCheck.$mount().$el;
        document.body.appendChild(tpl)
    }
    // 开启弹窗
    let that = Vue.prototype;
    // 注意此名称需要和.vue组件中的名称一致
    that.showMsgBox = (options)=>{
        if(!ConfirmBoxCheck) MessageBoxInstance();
        if(typeof options === 'string'){
            ConfirmBoxCheck.content = options;
        }else if(typeof options === 'object'){
            Object.assign(ConfirmBoxCheck,options);
        }

        return ConfirmBoxCheck.showMsgBox().then(res=>{
            ConfirmBoxCheck = null;
            return Promise .resolve(res);
        }).catch(err=>{
            ConfirmBoxCheck = null;
            return Promise.reject(err);
        })
    }
    // Vue.prototype.$msgBox = {
    //     showMsgBox(options) {
    //         if (!ConfirmBoxCheck) {
    //             MessageBoxInstance();
    //         }
    //         if (typeof options === 'string') {
    //             ConfirmBoxCheck.content = options
    //         } else if (typeof options === 'object') {
    //             Object.assign(ConfirmBoxCheck, options)
    //         }
    //         return ConfirmBoxCheck.showMsgBox().then(val => {
    //             ConfirmBoxCheck = null;
    //             return Promise.resolve(val)
    //         }).catch(err => {
    //             ConfirmBoxCheck = null;
    //             return Promise.reject(err)
    //         })

    //     }
    // }
}

export default confirmBox