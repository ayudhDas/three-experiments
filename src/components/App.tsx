import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Menu, MenuItem } from './Menu';
import { asyncComponent } from 'react-async-component';

const menuItems: Array<MenuItem> = [
    {
        name: 'Hello World',
        url: 'example1'
    }
];

function NoMatch(): React.ReactElement<undefined> {
    return (
        <div>
            <h3>Nothing here</h3>
            <Link to="/">Go back</Link>
        </div>
    )
}

const GameWindow: React.ComponentClass<any> = asyncComponent({resolve: () => _import(/* webpackChunkName: "game-window" */'./GameWindow')});

export default function App(): React.ReactElement<undefined> {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Menu items={menuItems} />} />
                <Route exact path="/example1" render={() => <GameWindow />} />
                <Route component={NoMatch}/>
            </Switch>
        </BrowserRouter>
    );
}