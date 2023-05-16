import { NavLink } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
  return (
    <div id="navbar">
      {/* <div id="title"><h1>Shopper - Teste</h1></div> */}
      <div id="logo"></div>
      <ul>
        <li>
          <NavLink to='/'>Enviar Arquivo</NavLink>
        </li>
        <li>
          <NavLink to='/products' className="btn">Produtos</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar