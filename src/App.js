import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi()

const App = () => {
  const [token, setToken] = useState(null)


  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ''
    const _token = hash.access_token

    if (_token) {
      setToken(_token)
      spotify.setAccessToken(_token)
      spotify.getMe().then(user => {
        console.log('Welcome back!', user);
      })
    }
  }, [])


  return (
    <div className="App">
      {
        token?
          <>
            <h1>You are logged in!</h1>
            <button onClick={()=>setToken('')}>Logout</button>
          </> : <Login />
      }
      
    </div>
  );
}

export default App;
