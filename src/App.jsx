import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Form from './components/Form'
import Home from './pages/Home'
import Layout from '../src/components/Layout'

function App() {
  return (
    <Router basename="/google-form-app">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App