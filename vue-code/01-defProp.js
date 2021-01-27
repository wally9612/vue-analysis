

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

function observe(obj){
    if(typeof obj !== 'object' || obj === null){
        return
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

let obj = {foo: 'foo', bar: 'bar', baz: {a:10}}

observe(obj)

obj.foo
obj.baz.a = 20