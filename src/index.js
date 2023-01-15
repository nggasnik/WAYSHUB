import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from "react-query"
import { UserContextProvider } from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient()

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>

        <Router>
          <App />
        </Router>

      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
)