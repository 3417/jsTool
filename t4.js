

/**
 * 1.动态绑定属性名
 * */ 

const dynamic = "flavour";
var item = {
    name:"Coke",
    [dynamic]:"Cherry"
}

console.log(item); //{ name: "Coke", flavour: "Cherry" }