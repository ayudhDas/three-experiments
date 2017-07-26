import './App.css';

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

export default function App(props: any): React.ReactElement<any> {
    return (
        <div>
            <header className="app-header">
                <h1>Three.js experiments</h1>
                <h3>Powered by <a target="_blank" href="https://threejs.org/">three.js</a></h3>
                <a target="_blank" href={`https://github.com/ayudhDas/three-experiments`}>
                    <img
                        style={{position: 'absolute', top: 0, right: 0, border: 0}}
                        src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
                        alt="Fork me on GitHub"
                    />
                </a>
            </header>
            <section className="app-container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => <Menu items={menuItems} />} />
                        <Route exact path="/example1" render={() => <GameWindow />} />
                        <Route component={NoMatch}/>
                    </Switch>
                </BrowserRouter>
            </section>
            <footer className="app-footer">
                <span>made with <span className="fa fa-heart-o fa-2x" /> by Ayudh Das using react, react-router and webpack</span>
                <img src={props.im} />
            </footer>
        </div>
    );
}