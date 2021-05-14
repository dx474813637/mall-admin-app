const roleToRoutes = {
    "coustomer": [
        {
            name: "Product"
        },
        {
            name: "ProductList"
        },
        {
            name: "ProductAdd"
        },
        {
            name: 'ProductEdit'
        }
    ],
    "admin": [
        {
            name: "Product"
        },
        {
            name: "ProductList"
        },
        {
            name: "ProductAdd"
        },
        {
            name: 'ProductEdit'
        },
        {
            name: "Category"
        },
    ]
}

export function getNewRoute(role, routes) {
    const list = roleToRoutes[role].map(ele => ele.name)
    const menuList = deepFilter(deepClone(routes), list)
    return menuList
}
export function deepFilter(target, keys) {
    const arr = []
    target.forEach(ele => {
        if(!ele.meta.isHide && keys.includes(ele.name)) {
            if(ele.children && ele.children.length != 0) {
                arr.push({
                    ...ele,
                    children: deepFilter(ele.children, keys)
                }) 
            }else {
                arr.push({
                    ...ele
                }) 
            }
        }
    })
    return arr
}

export function deepClone(target) {
    let arr
    if(typeof target != 'object') {
        return target
    }
    if(target instanceof Array) {
        arr = []
        target.forEach((ele, index) => {
            arr[index] = deepClone(ele)
        })
    }else if(target instanceof Object) {
        arr = {}
        for(let key in target) {
            arr[key] = deepClone(target[key])
        }
    }
    return arr

    
}