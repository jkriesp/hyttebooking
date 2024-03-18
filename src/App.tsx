import './App.css';
import BannerComponent from './components/BannerComponent';
import LoginComponent from './components/login/LoginComponent';

function App() {


  return (
    <>
      <BannerComponent title='Hyttebooking' description='Velkommen til Hyttebooking' />
      <LoginComponent />
    </>
  );
}

export default App;
