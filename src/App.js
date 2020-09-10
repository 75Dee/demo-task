import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leftsection from './module/Leftsection'
import Rightsection from './module/Rightsection'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import  rootReducer from './store'
const store = createStore(rootReducer)
function App() {
  return (
    <Provider store={store}>
      <div className="App pt-3">
        <header className="col-sm-12">
          <h2><strong>SpaceX Launch Programe</strong></h2>
        </header>
        <section className="container-fluid mt-3">
          <div className="row">
          <Leftsection className="col col-sm-2"></Leftsection>
          <Rightsection></Rightsection>
          </div>
        </section>
      </div>
    </Provider>
  );
}

export default App;
