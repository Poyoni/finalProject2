
import MapPage from './pages/mapPage'
import { Route, Routes,  BrowserRouter as Router } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MapPage />} />
        {/* <Route path='/graph' element={<GraphPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
