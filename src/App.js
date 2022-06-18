import './App.css';
import './styles/style.css'

import Layout from './components/layout/Layout'
import Home from './components/home'

function App() {
  return (
    <div className="App" data-testid="app">
        <Layout>
          <Home />
        </Layout>
    </div>
  );
}

export default App;
