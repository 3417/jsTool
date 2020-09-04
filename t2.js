// 1.数组求交集和差集
let a = new Set([1,2,3,4])
let b = new Set([4,5,6,7])

new Set([...a].filter(x=>b.has(x))) // 交集（都是已a开始的）
new Set([...a].filter(x=>!b.has(x))) // 差集（都是已a开始的）

// 2.删除两个数组中相同的数据(根据某个字段)
let arr1 = [{id:'1',name:'json'},{id:'2',name:'book'} ]
let arr2 = [{id:'1',name:'json',age:'15'},{id:'2',name:'book',age:'16'},{id:'3',name:'ani',age:'17'}] 
//ES6的方法
let add = arr2.filter(item => !arr1.some(ele=>ele.id===item.id));
console.log(add)

// 3.替换数组中的某个对象(根据某个字段)
let arr =[
    {id:1,name:"test"},
    {id:2,name:"test1"},
    {id:3,name:"test2"},
]
let obj = {id:2,name:"hahah"}
arr = arr.map(item=>item.id === obj.id ? obj :item)

// 4.根据某个字段进行匹配归类
let data = []; //OR data = {}
for(let i=0;i<res.length;i++){
    if(data[res[i].xxxx]){
        let temp = [];
        temp.push(res[i]);
        data[res[i].xxxx] = temp;
    }else{
        data[res[i].xxxx].push(res[i])
    }
}