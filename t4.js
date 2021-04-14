/**
 * 1.动态绑定属性名
 * */

const dynamic = "flavour";
var item = {
    name: "Coke",
    [dynamic]: "Cherry"
}

console.log(item); //{ name: "Coke", flavour: "Cherry" }


/**
 * 权限--借鉴（掘金上的文章）
 * 
 * */


// ----hasPermission.js----
const hasPermission = {
    install: function (Vue, options) {
        Vue.directive("has", {
            inserted(el, binding, vnode) {
                filterGlobalPermission(el, binding, vnode)
            }
        })
    }
}

export const filterGlobalPermission = (el, binding, vnode) => {
    let permissionList = [],permissions = [];
    let storageData = sessionStorage.getItem("AUTH_LIST");
    let authList = JSON.parse(storageData)??[];
    for(let auth of authList){
        permissionList.push(auth);
    }
    if(!permissionList.length){
        el.parentNode.removeChild(el);
        return;
    }

    for(let item of permissionList){
        // permissions.push(item.xxxxx)
        permissions.push(item.permission);
    }

    if(!permissions.includes(binding.value)){
        el.parentNode.removeChild(el);
    }
}

export default hasPermission;

// -----main.js

import hasPermission from '@/utils/hasPermission.js'
Vue.use(hasPermission);

// xxxx.vue
<el-button v-has="car:info:add"></el-button>