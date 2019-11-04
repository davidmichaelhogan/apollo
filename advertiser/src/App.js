// ----------------------------------------------------------------------------------//
// App Wrapper | Apollo Advertiser Dashboard
// Apollo V2
// David Michael Hogan | November 2, 2019 | Updated:
// ----------------------------------------------------------------------------------//

// -------------------- WORKING ON GETTING THE WRAPPER ALL SET FOR THE DASHBOARD !
// -------------------- TRY SETTING UP THE TABLE OR THE STEPPER !

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import client from "./apollo/client";

import { ad } from "./apollo/queries";

// Material and styles
import Button from '@material-ui/core/Button';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <MainMenu/>
        </header>
        <div>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" component={About} />
          <Route exact path="/code" component={Code} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/info" component={info} /> */}
        </div>
      </div>
      </ApolloProvider>
    </Router>
  );
}

const TestQuery = () => {
  const { loading, error, data } = useQuery(ad);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) console.log(data.ad.map(ad => ad.id));

  return data.ad.map(({ id, attributes }) => (
        <div key={id}>
      <p>
        {attributes.headline}
      </p>
    </div>
  ));
}

const MainMenu = () => (

  <div>
    <Link to="/">
      <Button variant="contained" color="primary">home</Button>
    </Link>
    {/* <Link to="/about">
      <button>About</button>
    </Link>
    <Link to="/code">
      <button>code</button>
    </Link>
    <Link to="/code">
      <button>contact</button>
    </Link>
    <Link to="/info">
      <button>info</button>
    </Link> */}
  </div>

)

const Home = () => (
  <div>
    <TestQuery />
  </div>
)

// const About = () => (
//   <div>
//     About
//   </div>
// )

// const Code = () => (
//   <div>
//     Code
//   </div>
// )

// const Contact = () => (
//   <div>
//     Contact
//   </div>
// )

// const info = () => (
//   <div>
//     info
//   </div>
// )

export default App;
