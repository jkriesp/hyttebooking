import './App.css';
import BannerComponent from './components/BannerComponent';
import Dashboard from './components/dashboard/Dashboard';
import LoginButton from './components/login/LoginButton';
import LogoutButton from './components/login/LogoutButton';
import RegisterUser from './components/userCreation/RegisterUser';

function App() {

  return (
    <>

      <div className="mainContainer">
        <BannerComponent title='Hyttekalender' description='Din familie, én hytte, ubegrensede minner!' />
        <Dashboard />
        <LoginButton />
        <LogoutButton />
        <RegisterUser />
      </div>
    </>
  );
}

export default App;
