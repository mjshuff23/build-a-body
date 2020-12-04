import React, { useState } from 'react';
import './stylesheets/NavBar.css';
import { SidebarData } from './SidebarData';
import *  as FaIcons from "react-icons/fa";
import { Fade as Hamburger } from 'hamburger-react';
import *  as AiIcons from "react-icons/ai";
import { NavLink, Link } from 'react-router-dom';

function NavBar() {
    const [sidebar, setSidebar] = useState(false);

    const openSidebar = () => setSidebar(!sidebar);

    return (
        <div className='nav'>
            <div className="navBar">
                <Link to="#">

                    <FaIcons.FaBars className='navBar__lines' size='32' onClick={ openSidebar } />
                    {/* <Hamburger size='22' color="#2d3142"
                        toggled={ sidebar } toggle={ openSidebar } /> */}
                </Link>
            </div>
            <nav className={ sidebar ? 'navBar__menu active' : "navBar__menu" }>
                <ul className='navBar__items'>
                    <li className="navBar--toggle">
                        <Link to="#" className='navBar__menuBar' onClick={ openSidebar }>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    { SidebarData.map((item, idx) => {
                        return (
                            <li key={ idx } className={ item.className }>
                                <NavLink exact to={ item.path } activeClassName='active'>
                                    { item.icon }
                                    <span className="navBar__linkText">{ item.title }</span>
                                </NavLink>
                            </li>
                        );
                    }) }
                </ul>
            </nav>
        </div>
    );
}
export default NavBar;
