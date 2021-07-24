import {
  BrowserRouter as Router, Redirect, Route,
  Switch
} from 'react-router-dom';
import './App.css';
import AddTrainee from './pages/AddTrainee';
import Dashboard from './components/Dashboard';
import EditTrainee from './components/EditTrainee';
import ArchiveList from './pages/ArchiveList';
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import Trainees from './pages/Trainees';
import User from './pages/User';
import localStorageService from './services/localStorageService';
import AddUser from './pages/AddUser';


function App() {
  return (
    <div className="App">
      
      <Router>
      {/* { localStorageService.getItem('authenticated') ?  */}
        <Route render={(props)=>(
              
                <Dashboard {...props}>
                    <Switch>
                        {/* <Route path="/" exact component={Dashboard}/>
                        <Route path="/home" exact component={Dashboard}/> */}
                         <Route path="/trainees" exact component={Trainees}/>
                        <Route path='/users' exact>
                          {localStorageService.getItem('authenticated') ? <User/>  : <Redirect to={{
                            pathname: '/signin'
                          }} />}</Route>
                       
                        <Route path="/addTrainee" exact component={AddTrainee}/>
                        <Route path="/addUser" exact component={AddUser}/>
                        <Route path="/editTrainee" exact component={EditTrainee}/>
                        <Route path="/archive" exact component={ArchiveList}/>
                        {/* <Route path="/page-3" component={Page3}/> */}
                        {/* <Route component={NotFound}/> */}
                    </Switch>
                </Dashboard>
            )}/>
            <Switch>
            <Route path='/' exact>
          {localStorageService.getItem('authenticated') ? <Home/>  : <Redirect to={{
            pathname: '/signin'
          }} />}
        </Route>
            
            <Route path="/signin" exact component={SignIn}/>
          {/* <Route path="/signin" ><SignIn/></Route>
          <Route path="/home" ><Dashboard/></Route> */}
        </Switch>
        {/* } */}
      </Router>
      
      

    </div>
  );
}

export default App;

