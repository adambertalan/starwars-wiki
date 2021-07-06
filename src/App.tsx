import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';

import './App.css';
import CharactersPage from './pages/CharactersPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/species/:species" component={CharactersPage} />
    </BrowserRouter>
  );
}

export default App;
