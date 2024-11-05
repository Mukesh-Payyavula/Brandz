import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct } from "../redux/actions/productActions";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import OfferBanner from '../components/OfferBanner';
import Reviews from '../components/Reviews/Reviews';
import ScrollingBanner from "../components/ScrollingBanner/ScrollingBanner";
import Categories from "../components/Categories/Categories";

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title="Brandz" />
      {!keyword && <ProductCarousel />}
      <ScrollingBanner />
      <h3>Shop By Category</h3>
      <Categories />
      <h3>Latest Products</h3>
      <Row>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      <OfferBanner />
      <Reviews />
    </>
  );
};

export default HomeScreen;
