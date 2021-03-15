import { 
BrowserRouter as Router,
Switch, 
Route,  
} from 'react-router-dom';
import { UserProvider } from './contexts/UserProvider';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
return (
	<div className="App">
	<UserProvider>
	<Router>
	<Switch>
		<Route path='/' exact><LandingPage /></Route>
		<Route path='/login'><LoginPage formType='login'/></Route>
		<Route path='/signup'><LoginPage formType='signup'/></Route>
		<ProtectedRoute path='/home' exact><HomePage /></ProtectedRoute>
	</Switch>
	</Router>
	</UserProvider>
	</div>
);
}

export default App;
