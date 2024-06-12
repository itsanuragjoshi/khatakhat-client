import Footer from './common/components/footer/Footer'
import Menu from './common/components/menu/Menu'

function App() {
  return (
    <main className='app'>
      <Menu />
      <div className='contentContainer'>
        <h1>Home</h1>
        <Footer />
      </div>
    </main>
  )
}

export default App
