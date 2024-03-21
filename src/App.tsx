import './App.css';
import BannerComponent from './components/BannerComponent';
import LoginComponent from './components/login/LoginComponent';
import LogoutButton from './components/login/LogoutComponent';
import Profile from './components/login/Profile';

function App() {


  return (
    <>
      <BannerComponent title='Hyttekalender' description='Din familie, én hytte, ubegrensede minner!' />
      <Profile />
      <LoginComponent />
      <LogoutButton />
    </>
  );
}

export default App;
