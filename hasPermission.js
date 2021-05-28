


// 自定义指令实现权限按钮配置

const hasPermission = {
    install(Vue,options){
        Vue.directive('has',{
            inserted(el,binding,vnode){
                filterGlobalPermission(el,binding,vnode);
            }
        })
    }
}

// 全局权限控制
export const filterGlobalPermission = (el,binding,vnode)=>{
    let permissionList = [];
    let authList = JSON.parse(sessionStorage.getItem(xxxx)) || [];  //TODO:获取权限参数名称
    for(let auth of authList){
        permissionList.push(auth);
    }
    if(!permissionList.length){
        el.parentNode.removeChild(el);
        return;
    }
    let permissions = [];
    for(let item of permissionList){
        permissions.push(item.permission);  //TODO这个地方注意后台的返回参数是什么
    }
    if(!permissions.includes(binding.value)){
        el.parentNode.removeChild(el);
    }
}

export default hasPermission;