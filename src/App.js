import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount () {
    this.props.autoLogin()
  }
  render(){
  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' component={QuizList} />
      <Redirect to = '/'/>
    </Switch>
  )
  if (this.props.isAunteficated) {
    routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path = '/logout' component={Logout}/>
        <Route path='/' exact component={QuizList} />
        <Redirect to = '/'/>
      </Switch>)
  }
  return (
    <Layout>
      {routes}
    </Layout>
  );
}
}
function mapStateToProps(state) {
  return {
    isAunteficated: !!state.auth.token
  }
}
function mapDispatchToProps (dispatch) {
  return {
    autoLogin: ()=>dispatch(autoLogin())
  }
}
export default withRouter (connect(mapStateToProps, mapDispatchToProps)(App));
