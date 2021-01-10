import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
import Navbar from './components/Navbar'

function App() {
  return (
  <>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/rooms">
        <Rooms />
      </Route>
      <Route exact path="/rooms/:id" component={SingleRoom}>
        <SingleRoom />
      </Route>
      <Route exact path="*">
        <Error />
      </Route>
    </Switch>
  </>
  )
}

export default App;
