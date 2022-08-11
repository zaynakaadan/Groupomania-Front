import WallPage from '../pages/Wall/WallPage.vue'
import LoginPage from "../pages/LoginPage.vue"
import EditCategory from "../components/ui/Card/EditCategory.vue"

import {createRouter, createWebHistory} from "vue-router"

// 1. Define route components.
const routes = [{ path: "/Login", component: LoginPage },
                { path: "/signup", component: LoginPage },
                {path: "/home", component: WallPage},   
                {name:'EditCategory', path: "/EditCategory/:id", component: EditCategory},                     
                ]    
// 2. Create the router instance and pass the `routes` option
const router = createRouter({ history: createWebHistory(), routes })
//Guard
router.beforeEach((to, from) => {   
if (isLoginRequires(to)) {
    return router.push("/login")//pour navigate à different URL
    }
})
function isLoginRequires(to) {
//on est pas dans une page privée 
if (!isPrivatePage(to)) return false//on est dans page publique pas besoin login return false
//  verify le token dans le cache
if ( !isTokenInCache()) return true//il y a pas  token in cache ça  vous dire oui il faut loger return true
return false//le login pas required
}

function isPrivatePage(to) {
//Redirect to login page if not logged in  
const publicPages = ["/login", "/signup"]
//Si to.path ni login ni signup alors il vas à login
return !publicPages.includes(to.path) 
}  
function isTokenInCache() {
    return localStorage.getItem("token") !=null
}
export {router} 