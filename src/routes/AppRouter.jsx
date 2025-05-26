import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../routes'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, index) => {
        const Page = route.component
        const Layout = route.layout
        
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        )
      })}

      {/* Private Routes */}
      {privateRoutes.map((route, index) => {
        const Page = route.component
        const Layout = route.layout
        
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <Layout>
                  <Page />
                </Layout>
              </ProtectedRoute>
            }
          />
        )
      })}
    </Routes>
  )
}

export default AppRouter