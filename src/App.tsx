import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';

import './App.css';
import CharactersPage from './pages/CharactersPage';
import CharacterProfilePage from './pages/CharacterProfilePage';
import { useState } from 'react';

function App() {
  const [header, setHeader] = useState<string>("Home page");

  const updateheader = (headerTitle: string) => {
    setHeader(headerTitle);
  }

  return (
    <BrowserRouter>
      <Header headerTitle={header}/>
      <Route path="/" exact >
        <HomePage updateHeader={updateheader}></HomePage>
      </Route>
      <Route path="/species/:speciesId">
        <CharactersPage updateHeader={updateheader} />
      </Route>
      <Route path="/character/:characterId">
        <CharacterProfilePage updateHeader={updateheader}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
