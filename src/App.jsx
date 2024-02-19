import './App.css'
import DataProvider from './context/DataProvider.jsx';
import MainComponent from './components/Main';

function App() {

  return (
    <DataProvider>
      <MainComponent />
    </DataProvider>
  )
}

export default App
