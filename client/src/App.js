import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Launches from './components/Launches';
import Launch from './components/Launch';

const client = new ApolloClient({
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <div className="container">
                <h1 style={{ margin: 'auto' }}>SpaceX</h1>
              </div>
              <Launches />
            </>
          } />
          <Route path='/launch/:flight_number' element={<Launch />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
