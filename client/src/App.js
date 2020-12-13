import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import BookModal from './components/BookModal';
import Bookshelf from './components/Bookshelf';
import Login from './components/Login';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        {/* <AppNavbar/> */}
        <Router>
          <Route path="/" component={AppNavbar}/>
          <Route exact path={["/", "/home", "/book/:id"]}component={Home}/>
          {/* <Route path="/book/:id" component={BookModal}/> */}
          <Route path="/bookshelf" component={Bookshelf}/>
          <Route path="/login" component={Login}/>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
