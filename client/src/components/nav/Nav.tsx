import './Nav.scss'

function Nav() {
  return (
    <div className='nav__container'>
      <div className="links">
        <ul>
          <li>Home</li>
          <li>Engine</li>
          <li>Dataset</li>
        </ul>
      </div>
      <div className="slogans">
        <p>Iowa</p>
        <p>Situation</p>
      </div>
    </div>
  )
}

export default Nav