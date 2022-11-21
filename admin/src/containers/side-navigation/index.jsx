import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faPeopleGroup,
  faBoxesStacked,
  faBagShopping,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';
function Sidenav() {
  // const { pathname } = useLocation();
  // const page = pathname.replace('/', '');

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Bảng điều khiển Admin</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="dashboard">
          <NavLink to="/">
            <span className="icon">
              <FontAwesomeIcon icon={faTableColumns} className="fa-lg" />
            </span>
            <span className="label">Trang chủ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users">
          <NavLink to="/users">
            <span className="icon">
              <FontAwesomeIcon icon={faPeopleGroup} className="fa-lg" />
            </span>
            <span className="label">Người dùng</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="categories">
          <NavLink to="/categories">
            <span className="icon">
              <FontAwesomeIcon icon={faLayerGroup} className="fa-lg" />
            </span>
            <span className="label">Thương hiệu</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="products">
          <NavLink to="/products">
            <span className="icon">
              <FontAwesomeIcon icon={faBoxesStacked} className="fa-lg" />
            </span>
            <span className="label">Sản phẩm</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="orders">
          <NavLink to="/orders">
            <span className="icon">
              <FontAwesomeIcon icon={faBagShopping} className="fa-lg" />
            </span>
            <span className="label">Đơn hàng</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
