import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Header from './Components/Header'
import WatchList from './Components/WatchList';

function App() {
  return (
    <div className="App">
      <Header />
      <WatchList></WatchList>
    </div>
  );
}

export default App;
