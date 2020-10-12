import Home from './../screens/home/home'
import Login from './../screens/login/login'
import NotFound from './../screens/notFound/notFound'

const Pages = [
    {
        name: "Login",
        path: "/login",
        component: Login,
        role: 1
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