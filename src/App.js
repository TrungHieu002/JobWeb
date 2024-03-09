import './assets/App.css';
import config from 'config.json';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignInSide from './pages/SignInSide';
import SignUp from './pages/SignUp';
import { UserContextProvider, useUserContext } from 'contexts/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Router Protect layer
const ProtectedRoute = ({
  user, // kiểm tra đăng nhập
  role, // kiểm tra vai trò
  // redirectPath = '',
  children
}) => {
  if (user === null) {
    alert('Chưa đăng nhập tài khoản. Điều hướng đến trang đăng nhập.');
    return <Navigate to={'/'} replace/>
  };
  if (role !== user.role) {
    alert('Không được phép truy cập.');
    window.history.back();
  }
  else
    return children ? children : <Outlet />;
};
// URL Router
const ReactRouter = () => {
  const [user,] = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập */}
        <Route index element={<SignInSide />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        {/* Chưa đăng kí thì role = null */}
        <Route path='signup' element={<ProtectedRoute user={user} role={'null'}><SignUp /></ProtectedRoute>} />
        {/* Sau khi đăng nhập */}
        <Route path='/customer' element={
          <ProtectedRoute user={user} role={'customer'}>
              <MainLayout/>
          </ProtectedRoute>
        }>
        </Route>
        </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId={config.gg_cloud.client_id}>
      <UserContextProvider>
        <ReactRouter/>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
