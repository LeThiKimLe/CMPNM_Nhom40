import { Routes, Route, Navigate } from 'react-router-dom';
import './App.less';
import './assets/styles/main.less';
import './assets/styles/responsive.less';
import Main from './containers/layout';
import Home from './pages/home';
import Orders from './pages/orders';
import Products from './pages/products';
import Profile from './pages/profile';
import SignIn from './pages/sigin_in';
import Users from './pages/users';

function App() {
  return (
    <div className="App">
      <Main>
        <Routes>
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
