import React, { useEffect } from "react";
import Login from "./Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./Signup";
import { Row, Card, Col } from "react-bootstrap";

function CoffeeItem({ name, price, description, image, inStock }) {
  return (

    <Card bg={'light'} style={{ width: '18rem' }}>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{'$' + price + ' | ' + name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{inStock}</Card.Text>
      </Card.Body>
    </Card>
  )
}

function DayHours({ day, fromH, toH, closed }) {
  if (closed) {
    return (<p> {day + ': closed'} </p>);
  } else {
    return (<p>{day + ': ' + fromH + '-' + toH}</p>);
  }
}

function App() {
  const [token, setToken] = React.useState();
  const [coffee, setCoffee] = React.useState();
  const [hours, setHours] = React.useState();
  const [locations, setLocations] = React.useState();
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/coffee/", requestOptions)
      .then(response => response.json())
      .then(result => setCoffee(result.results))
      .catch(error => console.log('error', error));

    fetch("http://127.0.0.1:8000/api/hours/", requestOptions)
      .then(response => response.json())
      .then(result => setHours(result.results))
      .catch(error => console.log('error', error));

    fetch("http://127.0.0.1:8000/api/locations/", requestOptions)
      .then(response => response.json())
      .then(result => setLocations(result.results))
      .catch(error => console.log('error', error));
  }, [])

  function clickLogout() {
    setToken(undefined);
  }

  if (token !== undefined) {
    console.log("token defined: ", token);
    return (
      <div className="wrapper">
        <h1>Application</h1>
        <a onClick={clickLogout}> logout </a>
        <Row>
          {Object.keys(coffee).map((key) => {
            return <CoffeeItem name={coffee[key].name} prcie={coffee[key].price} image={coffee[key].image} description={coffee[key].description} inStock={coffee[key].in_stock} />
          })}
        </Row>
      </div>
    );
  } else {
    console.log("undefined token: ", token);
    return (
      <div>
        {/* <Redirect push to="/sign-in" /> */}
        <Login setToken={setToken} />
      </div>
    );
  }
}

export default App;
