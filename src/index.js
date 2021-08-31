import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import store from './redux/reducers/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import firebase from './firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';


const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

const Root = () => {

  return (
    <Switch>
      <Route exact path="/app" component={App} />
      <Route exact path="/" component={Login} />
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

