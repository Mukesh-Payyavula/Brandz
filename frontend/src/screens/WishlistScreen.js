import React from "react";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { removeFromWishlist } from "../redux/actions/wishlistActions";
import { addToCart } from "../redux/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId, 1));
    dispatch(removeFromWishlist(productId));
    toast.success("Item added to cart!"); 
  };

  return (
    <>
      <Meta title="Clothshop | Wishlist" />
      <Link className="btn btn-light my-3" to="/">
        Go Home
      </Link>
      <Row>
        <h2 className="mb-4">Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <Message variant="info">
            Your wishlist is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Row className="py-4">
            <Col md={12}>
              {wishlistItems.map((item) => (
                <ListGroup variant="flush" key={item.product}>
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col>
                        <h5>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </h5>
                        <h4 className="py-2">₹ {item.price}</h4>
                      </Col>
                      <Col>
                        <Button
                          className="my-3"
                          variant="success"
                          onClick={() => addToCartHandler(item.product)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="my-3"
                          variant="danger"
                          onClick={() => dispatch(removeFromWishlist(item.product))}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Col>
          </Row>
        )}
      </Row>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
    </>
  );
};

export default WishlistScreen;
