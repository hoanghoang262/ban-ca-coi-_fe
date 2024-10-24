import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import Blog from './features/blog/Blog';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CommonTemplate from './shared/templates/CommonTemplate';
import AboutUs from './features/aboutUs/aboutUs';
import Pricing from './features/pricing/pricing';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import OrderHistory from './features/order/OrderHistory';
import AdminTemplate from './shared/templates/AdminTemplate';
import NotFound from './shared/components/NotFound';
import PriceManager from './features/admin/PriceManager';
import AuthGuard from './shared/components/AuthGuard';
import Home from './features/home/home';
import Profile from './features/profile/Profile';
import { accessTokenState, userInfoState } from './shared/state/atom';
import BlogManager from './features/admin/BlogManager';

function App() {
  const setUserInfo = useSetRecoilState(userInfoState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo, setAccessToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommonTemplate />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route
            path="order"
            element={
              <AuthGuard>
                <Order />
              </AuthGuard>
            }
          />
          <Route
            path="order/create"
            element={
              <AuthGuard>
                <CreateOrder />
              </AuthGuard>
            }
          />
          <Route path="order/history" element={<OrderHistory />} />
          <Route path="blog" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="pricing" element={<PriceManager />} />
          <Route path="blog" element={<BlogManager />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
