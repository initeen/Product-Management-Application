import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import CreateAndUpdate from './pages/CreateAndUpdate';
import View from './pages/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
            <ToastContainer position='top-center'/>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/createProduct" component={CreateAndUpdate}/>
                  <Route exact path="/update/:product_id" component={CreateAndUpdate}/>
                  <Route exact path="/view/:product_id" component={View}/>
              </Switch>
        </div>
      </BrowserRouter>
    </div>
   );
}

export default App;
