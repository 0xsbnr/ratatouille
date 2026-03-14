import logo from './logo.svg';
import './App.css';
import Cookies from "js-cookie";

import LoginPage from './pages/Login';


//function App() {
//  return (
//    <div className="App">
//      Hello World
//    </div>
//  );
//}

const App = () => {
    let sessionID = Cookies.get('session_id')
    if (sessionID===-1 || sessionID===undefined) {
        return (
            <div>
                user isnt logged in
            </div>
        )
    } else {
        return (
            <div>
                send user to /home or smth
            </div>
        )
    }
}

export default App;
