import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Form from './components/Form'
import Home from './pages/Home'
import Layout from '../src/components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App