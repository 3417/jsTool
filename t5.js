
/**
 * 正则模块
*/


// 匹配 左右中 括号

let reg = /[\[\]]/;

// 全局匹配横线
let reg = /(-){1}/g

// 正则实现手机号码中间为星号

let reg = str.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')

// 匹配包含至少一个字母和数字的正则
let reg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/

// 匹配数字和小数,只有一个小数点

let reg = /^\d+$|^\d+[.]?\d+$/

// 限制只能输入七位整数两位小数
let reg = /(^\d{1,7}$)|(^\d{1,7}?\.\d{1,2}$)/

// 只能输入正整数
let reg = /^[1-9]\d*$/

// 只允许输入数字，字符及符号（特殊符号除外）,至少包含数字和字母，最少6个字符，不超过20个字符
let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6-20}$/

// vue限制input输入小数点后两位的number
{/* 
        <input type="number" @keydown="handleInput2" placeholder="请输入或查看" v-model="item.SalePrice">
        handleInput2(e) {
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null  // 通过正则过滤小数点后两位

            e.target.value=e.target.value.replace(/[^\d]/g,''); // Vue 限制input输入数字 不可小数
    
        }, 
*/}


// 解构赋值别名
const carLine = {
    firstName:'Jock',
    age:22
}
const {firstName:name,age:af} = carLine;
console.log(name,af) //别名

