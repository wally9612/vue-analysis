// 创建KVue的构造函数
class KVue {
    constructor(options){
        // 保存选项
        this.$options = options
        this.$data = options.data

        // 响应式处理
        observe(this.$data)

        //代理
        proxy(this, '$data')
    }
}

//数据响应式构造函数
class Observe {
    constructor(value) {
        this.value = value
        // 判断其类型
        if(typeof value === 'object'){
            this.walk(value)
        }
    }

    //对象数据响应化
    walk(obj){
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }

    //数组数据响应化，待补充
}



//数据拦截 Object.defineProperty
function defineReactive(obj, key, val){
    observe(val)
    Object.defineProperty(obj, key, {
        get(){
            console.log('get:' + key);
            return val
        },
        set(newVal){
            observe(newVal)
            if(newVal !== val){
                console.log('set', newVal)
                val = newVal
            }

        }
    })
}

//数据递归遍历
function observe(obj){
    if(typeof obj !== 'object' || obj === null){
        return
    }

    new Observe(obj)
}

// 代理函数,方便直接访问$data里面的数据
function proxy(vm, sourceKey){
    // console.log(vm,'dd')
    Object.keys(vm[sourceKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get(){
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}
