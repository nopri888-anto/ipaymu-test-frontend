import React from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import Biodata from './pages/Biodata';
import AddBiodata from './pages/AddBiodata';
import EditBiodata from './pages/EditBiodata';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Biodata}/>
        <Route path="/add-biodata" component={AddBiodata}/>
        <Route path="/edit-biodata/:uuid" component={EditBiodata}/>
      </Switch>
    </Router>
  );
}

export default App;
