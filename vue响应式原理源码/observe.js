let data = {
    name: 'hhhh',
    age: 18,
    wuuw: {
        name: 'ooo',
        age: 18
    }
};
//定义函数来进行某个属性的读写操作
function defineReactive(data, key, value) {
    observe(value); //递归 
    Object.defineProperties(data, key, {
        //读的操作
        get() {
            return value
        },
        //这里的newValue是我们传入的值
        set(newValue) {
            //如果两个值相等那就不赋值
            if (value == newValue) {
                return;
            }
            value = newValue; //传入的值等于data里面的值
            render();
        }
    })
}

const arrProto=Array.prototype;//将原来的数组方法保留下来
const arrayMethods=Object.create(arrProto);//这里是为了不污染原型里面的方法
['push', 'pop', 'shift', 'unshift' ,'sort', 'splice', 'reverse'].forEach(method=>{
    arrayMethods[method]=function(){
        arrayMethods.call(this,...arguments);
        render();
    }
})



function observe(data) {
    //如果是一个数组的话
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods;
        return;
    }
    //如果 data是一个对象 我们应该循环遍历内容
    if (typeof data === 'object') {
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }
}

function render() {
    console.log('页面已经渲染了')
}