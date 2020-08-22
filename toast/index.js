// 引入相应的组件
import Toast from './toast.vue';
// 挂载
let ObjToast = {}
ObjToast.install = function (Vue, options) {
    // 如果存在多条显示最新的一条
    if (document.getElementsByClassName('vt-toast').length) return
    let toastTpl = Vue.extend(Toast); //挂载
    let $vm = new toastTpl();
    let $ele = $vm.$mount().$el;
    document.body.appendChild($ele);

    Vue.prototype.$toast = {
        show(options) {
            if (typeof options === 'string') {
                $vm.text = options
            }
            if (typeof options === 'object') {
                Object.assign($vm, options);
            }
            $vm.show = true;
            setTimeout(() => {
                $vm.show = false
            }, $vm.time)

        },
        hide() {
            $vm.show = false;
        }
    }
}

export default ObjToast;