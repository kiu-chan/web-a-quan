// Public Pages
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Courses from '../pages/public/Courses'
import Enroll from '../pages/public/Enroll'
import Blog from '../pages/public/Blog'
import Contact from '../pages/public/Contact'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'

// Routes công khai
const publicRoutes = [
    { 
        path: '/', 
        component: Home,
        layout: PublicLayout
    },
    {
        path: '/about',
        component: About,
        layout: PublicLayout
    },
    {
        path: '/courses',
        component: Courses,
        layout: PublicLayout
    },
    {
        path: '/enroll',
        component: Enroll,
        layout: PublicLayout
    },
    {
        path: '/blog',
        component: Blog,
        layout: PublicLayout
    },
    {
        path: '/contact',
        component: Contact,
        layout: PublicLayout
    }
]

// Routes yêu cầu đăng nhập
const privateRoutes = [
    // Private routes sẽ thêm sau
]

export { publicRoutes, privateRoutes }