import Logo_ML from './Assets/Logo_ML.png';
import { Route, Link, Switch,  BrowserRouter  } from 'react-router-dom';
import React from "react";
import './App.scss';
import SearchComponent from './Components/search-component/search-component';
import SearchPage from './Pages/Search/Search';
import ProductPage from './Pages/Product/Product';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <div className="h-content">
            <Link to={"/"}>
              <img src={Logo_ML} className="App-logo" alt="logo mercado libre" />
            </Link>
            <SearchComponent></SearchComponent>    
          </div>   
        </header>
        <div className="App-content">
          <Switch>
            <Route exact path="/items" component={SearchPage} />
            <Route exact  path="/items/:id" component={ProductPage} />

          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
