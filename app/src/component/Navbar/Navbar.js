import { Link } from 'react-router-dom'
import './Navbar.css'
export default function Navbar(props) {
  const show =()=>{
    const navbarContent = document.getElementById('navbar-content')
    const navbar=document.getElementById('navbar')
    navbarContent.style.display = (navbarContent.style.display==='none')?'flex':'none'
    navbar.style.background =(navbar.style.background==='rgba(0, 0, 0,1)')?"rgba(0, 0, 0,0.5)":"rgba(0, 0, 0,1);"
  }
  const searchBar=()=>{
    const Search = document.getElementById('search')
    const SearchInput = document.getElementById('search-input')
    Search.style.display=(Search.style.display==='none')?'flex':'none'
    SearchInput.style.display=(SearchInput.style.display==='none')?'flex':'none'
  }
  return (
    <>
      <div className="navbar" >
        <ul id='navbar'>
          <div className="phone-navbar">
          <li className='list bar' id='bars' onClick={show}><Link><i className="fa-solid fa-bars"></i></Link></li>
          <li className="list logo"><Link><h2>
            <span>ZER</span>
            <span className="red">O</span>
            <span>NE</span>
          </h2></Link></li>
          <li className="class bar search-bar" onClick={searchBar}><Link><i className="fa-sharp fa-solid fa-magnifying-glass"></i></Link></li>
          </div>
          <div className="navbar-content" id='navbar-content'>
            <li className='list phone-list'> <Link to='/'>Home</Link><p></p></li>
            <li className='list phone-list'> <Link to='/about'>about</Link><p></p></li>
            <li className='list phone-list'> <Link to='/about'>service</Link><p></p></li>
            <li className='list phone-list'> <Link to='/about'>ContLink us</Link><p></p></li>
            <li className='list phone-list'> <Link to='/about'>Profile</Link><p></p></li>
          </div>
        </ul>
        <div className='search' id="search"><input type="text" name="text" id="search-input" placeholder='Search' /></div>
      </div>
    </>
  )
}
