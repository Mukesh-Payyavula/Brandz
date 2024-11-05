import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import SearchBox from "./SearchBox";
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Assuming you have cart and wishlist in your Redux state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="navbar-custom">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Brandz</Navbar.Brand>
          </LinkContainer>
          <SearchBox />

          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/wishlist">
              <Nav.Link>
                <i className="fas fa-heart"></i> Wishlist
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="useradmin">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
