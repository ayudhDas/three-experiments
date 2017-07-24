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
        <li key={`li-${index}`}>
            <Link to={`/${item.url}`}>{item.name}</Link>
        </li>
    ));

    return (
        <div>
            <ul>
            {menuItems}
            </ul>
        </div>
    );
}