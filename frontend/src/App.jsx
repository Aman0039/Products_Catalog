import Home from './components/Home'
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className='select-none'>
        <Home/>
      </div>
    </BrowserRouter>
  )
}

export default App