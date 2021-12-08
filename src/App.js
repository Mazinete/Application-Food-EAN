import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/Navbar';
import   Products  from './components/Products';
import React from 'react';

function App() {
  
  return (
    <div className="App">
     
        <NavBar titre="Application Food EAN " />
      <div className="container" mt-3> 
        <Products />
      </div> 
      
    </div>
  );
}

export default App;


