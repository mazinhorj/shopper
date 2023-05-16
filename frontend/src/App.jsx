import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Container from './components/Container';
import Message from './components/Message'


function App() {


  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Message />
      <Container>
      <Outlet />
      </Container>
      <Footer />
    </div>
  )
}

export default App
