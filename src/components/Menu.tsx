import './Menu.css';

import * as React from 'react';
import { Link } from "react-router-dom";

export interface MenuItem {
    name: string,
    url: string
}

export interface MenuProps {
    items: Array<MenuItem>
}

export function Menu(props: MenuProps ): React.ReactElement<MenuProps> {
    const menuItems = props.items.map((item:MenuItem, index: number) => (
        <li key={`li-${index}`} className="menu-list-item" >
            <Link to={`/${item.url}`} className="menu-list-item-link" >{item.name}</Link>
        </li>
    ));

    return (
        <div className="menu-container">
            <ul className="menu-list-container">
            {menuItems}
            </ul>
        </div>
    );
}