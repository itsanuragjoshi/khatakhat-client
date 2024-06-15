import { Route, Routes } from 'react-router-dom'
import Footer from './common/components/footer/Footer'
import Menu from './common/components/menu/Menu'
import Customers from './pages/customers/customers'
import CustomersNew from './pages/customers/customersNew'

function App() {
  return (
    <main className='app'>
      <Menu />
      <div className='contentContainer'>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CustomersNew />} />
        </Routes>
        <Footer />
      </div>
    </main>
  )
}

export default App
