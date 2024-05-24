import {useState, useEffect} from 'react';
import './App.scss';
import Navbar from './components/navbar';
import CurrentProject from './components/currentproj';
import Intro from './components/intro';

function App() {

  const  [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const main_style = {
    width: width < 700 ? '80%' : '700px',
    padding: '20px',
    boxSizing: 'border-box',
    margin: '0 auto'
  }

  return (
    <>
      <div>
        <Navbar />
      </div>



      <div style={main_style}>
        <Intro />

        <div style={{height:'160px'}}></div>

        <CurrentProject />

        <div style={{height: '300px'}}></div>
      </div>
    </>
  )
}

export default App
