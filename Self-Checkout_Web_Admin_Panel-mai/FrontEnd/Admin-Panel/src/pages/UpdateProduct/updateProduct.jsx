import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./updateProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SidePanel from "../../Components/SidePanel/SidePanel";

function UpdateProduct() {
  const { Id } = useParams();
  const MovePage = useNavigate()

  const [product, setProduct] = useState({
    productName: "",
    barcode: "",
    productPrice: "",
    productStock: "",
    description: "",
    imageUri: "",
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/products/edit",product)
      .then(response => {
        // Handle the successful response here
        console.log('POST request successful:', response.data);
        MovePage('/product')
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error making POST request:', error);
      });
  };

  useEffect(() => {
    // Make a GET request to an API
    axios.get(`http://localhost:5000/products/getProduct/${Id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="main-cont1">
      <SidePanel/>
      <h1>Update Product</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="barcode">
            <Form.Label>Barcode</Form.Label>
            <Form.Control
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="productStock">
            <Form.Label>Product Stock</Form.Label>
            <Form.Control
              type="number"
              name="productStock"
              value={product.productStock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="imageUri">
            <Form.Label>Image URI</Form.Label>
            <Form.Control
              type="text"
              name="imageUri"
              value={product.imageUri}
              onChange={handleChange}
            />
          </Form.Group>
          <br />


          <Button
            variant="primary"
            style={{ backgroundColor: "green", alignSelf: "center" }}
            type="submit"
          >
            Update Product
          </Button>

        </Form>
      </Container>
    </div>
  );
}

export default UpdateProduct;
