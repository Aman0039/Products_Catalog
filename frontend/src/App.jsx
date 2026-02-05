import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className='select-none'>
      <Home/>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App