import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Accessing the cart and wishlist counts from the Redux state
  const cartItemsCount = useSelector((state) => state.cart.cartItems.length);
  const wishlistItemsCount = useSelector((state) => state.wishlist.wishlistItems.length);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar style={{ backgroundColor: 'navy' }} expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Brandz</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          
          <SearchBox />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> 
                  {cartItemsCount > 0 && <span className="badge bg-light text-dark ms-1">{cartItemsCount}</span>}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/wishlist">
                <Nav.Link>
                  <i className="fas fa-heart"></i>
                  {wishlistItemsCount > 0 && <span className="badge bg-light text-dark ms-1">{wishlistItemsCount}</span>}
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
