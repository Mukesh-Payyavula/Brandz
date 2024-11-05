import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../redux/actions/productActions";
import axios from "axios";

const CreateProductScreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { loading, success, error } = useSelector(
    (state) => state.productCreate
  );

  useEffect(() => {
    if (success) {
      navigate("/admin/products");
    }
  }, [dispatch, success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the image is set before submitting
    if (!image) {
      console.error('Image not uploaded. Please upload an image before submitting.');
      return; // Prevent submission if the image is not set
    }

    dispatch(
      createProduct({
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log('Uploading:', file); // Log the file being uploaded
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      console.log('Upload response:', data); // Log the response from the server

      // Adjust this line to access the correct property in the response
      if (data.imageUrl) {
        setImage(data.imageUrl); // Set the image URL correctly
      } else {
        console.error('Image URL not found in response:', data);
      }
      
      setUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Fashion">Fashion</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="price" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="countInStock" className="mt-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            label="Choose file"
            onChange={uploadFileHandler}
          />
          {uploading && <Loading />}
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          {loading ? <Loading /> : `Add`}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateProductScreen;
