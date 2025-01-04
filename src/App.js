import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Nav = lazy(() => import("./components/Nav"));
const Home = lazy(() => import("./components/home"));
const Footer = lazy(() => import("./components/footer"));
const Sites = lazy(() => import("./components/sites"));
const Map = lazy(() => import("./components/map"));
const Today = lazy(() => import("./components/today"));
const ChosenDay = lazy(() => import("./components/chosenday"));
const Live = lazy(() => import("./components/live"));
const LiveMap = lazy(() => import("./components/livemap"));
const Stats = lazy(() => import("./components/stats"));
const Login = lazy(() => import("./components/login"));
const Admin = lazy(() => import("./components/admin"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sites" exact component={Sites} />
            <Route path="/map" exact component={Map} />
            <Route path="/today" exact component={Today} />
            <Route
              path="/today/:site_name?/:datenow?"
              exact
              component={ChosenDay}
            />
            <Route path="/live" exact component={Live} />
            <Route path="/livemap" exact component={LiveMap} />
            <Route path="/stats" exact component={Stats} />
            <Route path="/login" exact component={Login} />
            <Route path="/admin" exact component={Admin} />
            <Route path="*" component={Home} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
