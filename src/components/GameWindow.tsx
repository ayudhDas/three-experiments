import './GameWindow.css';
import * as React from 'react';
import * as THREE from 'three';

export default class GameWindow extends React.Component<undefined, undefined> {

    canvas: any = null;

    constructor(props: any) {
        super(props);
        this.loadGame = this.loadGame.bind(this);
        this.prepareCanvas = this.prepareCanvas.bind(this);
    }

    componentDidMount() {
        this.prepareCanvas();
    }

    loadGame() {

    }

    prepareCanvas() {
        let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: this.canvas});
        renderer.setSize(800, 600);

    }

    render() {
        return (
            <div className="canvas-container">
                <canvas ref={c => { this.canvas = c }} />
            </div>
        )
    }

}