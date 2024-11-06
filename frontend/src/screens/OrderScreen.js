import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { getOrderDetails, payOrder, deliverOrder } from "../redux/actions/orderActions";
import { clearCart } from "../redux/actions/cartActions"; // Import clearCart action

const OrderScreen = () => {
  let params = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { success: successPay } = useSelector((state) => state.orderPay);
  const { loading: loadingDeliverd, error: errorDeliverd, success: successDeliverd } = useSelector(
    (state) => state.orderDeliver
  );

  // Calculate prices once the order is fetched
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || successPay || successDeliverd) {
      dispatch(getOrderDetails(params.id));
    }
    // Clear cart after successful payment
    if (order && order.isPaid) {
      dispatch(clearCart()); // Clear the cart when the order is paid
    }
  }, [dispatch, successPay, successDeliverd, params.id, order]);

  const deliverHandler = () => {
    dispatch(deliverOrder(params.id));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading ? (
        <Message variant="info">Loading order details...</Message> // Show message while loading
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order #{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <strong>Address:</strong>
                  <p>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <p>
                    <strong>Method: </strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                  {!order.isPaid && order.paymentMethod === "COD" && (
                    <Message variant="info">
                      Payment will be collected upon delivery.
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ₹ {item.price} = ₹ {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>₹ {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹ {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Charges</Col>
                      <Col>₹ {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>₹ {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {!order.isPaid && order.paymentMethod === 'COD' && (
                      <Message variant="info">
                        Payment will be collected upon delivery.
                      </Message>
                    )}
                    {loadingDeliverd ? (
                      <Message variant="info">Processing delivery...</Message> // Display custom message for delivery
                    ) : (
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <Button
                          onClick={deliverHandler}
                          className="w-100"
                          variant="primary"
                        >
                          Mark as delivered
                        </Button>
                      )
                    )}
                    {errorDeliverd && <Message variant="danger">{errorDeliverd}</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
