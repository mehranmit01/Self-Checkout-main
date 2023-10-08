import "@fortawesome/fontawesome-free/css/all.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartBar,
  faClipboardList,
  faHistory,
  faMoneyBillWave,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"; // Example icon, you can choose any other icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
import { useEffect } from "react";
import axios from 'axios';

library.add(
  faShoppingCart,
  faClipboardList,
  faMoneyBillWave,
  faUsers,
  faChartBar,
  faHistory
);

function Dashboard() {

  const [product,setproduct] = useState(0)
  const [Order,setOrder] = useState(0)
  const [user_c,setuser] = useState(0)
  const [tot, setTot] = useState(0)

  useEffect(() => {
    // Make a GET request to an API
    axios.get('http://localhost:5000/products/count')
      .then(response => {
        // setcardData(response.data); // Update the state with the fetched data
        setproduct(response.data.pro_count)
        setOrder(response.data.order_count)
        setuser(response.data.user_count)
        setTot(response.data.total)
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const cardData = [
    {
      title: product,
      description: "Items in Our Stores",
      iconName: faShoppingCart, // Use the actual icon object
    },
    { title: Order, description: "Total Orders", iconName: faClipboardList },
    {
      title: ` $. ${tot}`,
      description: "Total Income",
      iconName: faMoneyBillWave,
    },
    { title: user_c, description: "Total Customers", iconName: faUsers },
    // {
    //   title: "Income Report",
    //   description: "Generate Income Report",
    //   iconName: faChartBar,
    // },
    // { title: "History", description: "Order History", iconName: faHistory },
  ];

  return (
    <div className="main-cont">
      <h1 className="centered-title">Dashboard</h1>

      <Container>
        {/* First Row with 4 Cards */}
        <Row className="mb-4">
          {cardData.slice(0, 4).map((card, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="aspect-ratio-card">
                <Card.Body className="card-content-center">
                  <Card.Title className="card-title">
                    <FontAwesomeIcon icon={card.iconName} className="mr-2" />{" "}
                    {/* Added this line for the icon */}
                    {card.title}
                  </Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Second Row with 2 Cards */}
        <Row className="justify-content-md-center">
          {cardData.slice(4, 6).map((card, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="aspect-ratio-card">
                <Card.Body className="card-content-center">
                  <Card.Title className="card-title">
                    <FontAwesomeIcon icon={card.iconName} className="mr-2" />{" "}
                    {/* Added this line for the icon */}
                    {card.title}
                  </Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
