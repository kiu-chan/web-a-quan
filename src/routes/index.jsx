// Public Pages
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Courses from '../pages/public/Courses'
import Enroll from '../pages/public/Enroll'
import Blog from '../pages/public/Blog'
import Contact from '../pages/public/Contact'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import ForgotPassword from '../pages/auth/ForgotPassword'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import Students from '../pages/admin/Students'
import AdminCourses from '../pages/admin/AdminCourses'
import Posts from '../pages/admin/Posts'
import Analytics from '../pages/admin/Analytics'
import Messages from '../pages/admin/Messages'
import Profile from '../pages/admin/Profile'
import Settings from '../pages/admin/Settings'

// Layouts
import PublicLayout from '../layouts/public/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'
import AuthLayout from '../layouts/AuthLayout'

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
    },
    {
        path: '/login',
        component: Login,
        layout: AuthLayout
    },
    {
        path: '/signup',
        component: Signup,
        layout: AuthLayout
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        layout: AuthLayout
    }
]

// Routes yêu cầu đăng nhập
const privateRoutes = [
    {
        path: '/admin',
        component: AdminDashboard,
        layout: PrivateLayout
    },
    {
        path: '/admin/students',
        component: Students,
        layout: PrivateLayout
    },
    {
        path: '/admin/courses',
        component: AdminCourses,
        layout: PrivateLayout
    },
    {
        path: '/admin/posts',
        component: Posts,
        layout: PrivateLayout
    },
    {
        path: '/admin/analytics',
        component: Analytics,
        layout: PrivateLayout
    },
    {
        path: '/admin/messages',
        component: Messages,
        layout: PrivateLayout
    },
    {
        path: '/admin/profile',
        component: Profile,
        layout: PrivateLayout
    },
    {
        path: '/admin/settings',
        component: Settings,
        layout: PrivateLayout
    }
]

export { publicRoutes, privateRoutes }