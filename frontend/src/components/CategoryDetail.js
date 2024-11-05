import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../redux/actions/productActions';
import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Row, Col, Button } from 'react-bootstrap';

const CategoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProduct("", "", id)); // Fetch products by category ID
  }, [dispatch, id]);

  return (
    <div className="container mt-5">
      <Link to="/">
        <Button variant="secondary" className="mb-3">Back to Home</Button>
      </Link>
      <h2> {id}</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CategoryDetail;
