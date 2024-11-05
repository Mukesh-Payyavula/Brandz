import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProduct, deleteProduct } from "../redux/actions/productActions";

const ProductListScreen = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    dispatch(listProduct("", pageNumber, categoryFilter));
  }, [dispatch, successDelete, pageNumber, categoryFilter]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const categories = ["Men", "Women", "Kids", "Fashion"]; 

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Products List</h3>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/products/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter by Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCategoryFilter("")}>All</Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item key={category} onClick={() => setCategoryFilter(category)}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message variant="info">{categoryFilter ? `No products found in category: ${categoryFilter}` : "No products found."}</Message>
      ) : (
        <Row>
          <Col>
            {loadingDelete && <Loading />}
            <Table striped hover className="table-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Brand</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/edit/${product._id}`}>
                        <Button className="btn btn-sm" variant="primary">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn btn-sm"
                        variant="danger"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <Paginate page={page} pages={pages} isAdmin={true} />
    </>
  );
};

export default ProductListScreen;
