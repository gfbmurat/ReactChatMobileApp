import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import store from './redux/reducers/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import firebase from './firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import PrivateRoute from './components/auth/PrivateRoute';
import { useHistory } from 'react-router';
import SignUp from './components/auth/SignUp';
import '@material-tailwind/react/tailwind.css'

const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

const Root = () => {

  const history = useHistory();

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //Login olmuş

        history.push("/")

      } else {
        //Login olmamış
        history.push("/login")
      }
    })
  }, [history])

  return (
    <Switch>
      <PrivateRoute exact path="/">
        <App />
      </PrivateRoute>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  )
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

