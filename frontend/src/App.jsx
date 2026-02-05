import Home from './components/Home'
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
<BrowserRouter>
<div className='select-none'>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</div>
</BrowserRouter>

  )
}

export default App