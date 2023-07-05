import './App.css'
import ViewLayout from './layouts/ViewLayout'
import Home from './layouts/home/Home'
import Search from './layouts/search/Search'
import Nav from './components/nav/Nav'

function App() {

  return (
    <div>
      <Nav />
      <ViewLayout height="100vh" color='#F3F2F2'>
        <Home />
      </ViewLayout>
      <ViewLayout height="100vh">
        <Search />
      </ViewLayout>

    </div>
  )
}

export default App
