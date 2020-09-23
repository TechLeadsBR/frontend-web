import Home from './../screens/Home/Home'
import Login from './../screens/Login/Login'
import NotFound from './../screens/NotFound/NotFound'

const Pages = [
    {
        name: "Login",
        path: "/login",
        component: Login,
        role: 0
    }
]

const HomePage = {
    name: "Home",
    path: "/",
    component: Home
}

const NotFoundPage = {
    name: "NotFound",
    component: NotFound
}

export { Pages, HomePage, NotFoundPage }