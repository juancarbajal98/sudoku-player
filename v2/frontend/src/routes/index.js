import Home from './Home'
import NYT from './NYT'

let AppRoutes = [
    {
        component: Home,
        name: 'Home',
        path: '/' 
    },
    {
        component: NYT,
        name: 'NYT',
        path: '/nyt' 
    },
]

export {AppRoutes}