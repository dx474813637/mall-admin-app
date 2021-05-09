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

export default function getMenuRoute(role, routes) {
    const list = roleToRoutes[role].map(ele => ele.name)
    const menuList = routes.filter(ele => {
        if(!ele.meta.isHide && list.includes(ele.name)) {
            ele.children = ele.children.filter(item => {
                return !item.meta.isHide && list.includes(item.name)
            })
            return true
        }
    })

    return menuList
}