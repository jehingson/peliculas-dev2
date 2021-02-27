import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Header } from './componentes/Header';
import { Listas } from './componentes/Listas';
import { CreaPeliculas } from './componentes/CreaPeliculas';
import {DataProvider} from './context/GlobalState'
import { Thriller } from './componentes/Thriller';

function App() {
  return (
    <DataProvider>    
      <Router>
      <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Listas/>
        </Route>
        <Route exact path="/crear-peliculas">
          <CreaPeliculas />
        </Route>
        <Route exact path='/thriller/:id' >
          <Thriller />
        </Route>
      </Switch>
      </div>
    </Router>
    </DataProvider>
  );
}

export default App;
