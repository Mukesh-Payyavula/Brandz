import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../redux/actions/productActions";
import { listCategories } from "../redux/actions/CategoryActions";
import axios from "axios";

const EditProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productID = params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = useSelector((state) => state.productUpdate);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: loadingCategories, error: errorCategories } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      navigate("/admin/products");
    } else {
      if (!product || product._id !== productID) {
        dispatch(listProductDetails(productID));
        dispatch(listCategories());
      } else {
        setName(product.name);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setImage(product.image);
      }
    }
  }, [dispatch, product, productID, successUpdate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productID, name, description, brand, category, price, countInStock, image }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data.imageUrl); // Correctly set the image URL
      setUploading(false);
    } catch (error) {
      console.error(error.message);
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Edit Product</h2>
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="brand" className="mt-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            {loadingCategories ? (
              <Loading />
            ) : errorCategories ? (
              <Message variant="danger">{errorCategories}</Message>
            ) : (
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="countInStock" className="mt-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type="number" placeholder="Count In Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" label="Choose file" accept="image/*" onChange={uploadFileHandler} />
            {uploading && <Loading />}
          </Form.Group>
          {image && <img src={image} alt="Product" style={{ width: "100px", marginTop: "10px" }} />}
          <Button className="mt-3" type="submit" variant="primary">
            {loadingUpdate ? <Loading /> : `Edit`}
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default EditProductScreen;
