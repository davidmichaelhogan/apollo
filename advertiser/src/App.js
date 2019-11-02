import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import client from "./apollo/client";
import './styles/App.css';

import { ad } from "./apollo/queries";

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
      <button>home</button>
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
