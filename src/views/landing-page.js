import AppActions from 'flux/actions/app-actions';
import * as PIXI from 'pixi.js';
import StarField from 'views/components/canvas/starfield';
import VelocityPanel from 'views/components/velocity-panel';
import Chat from 'views/components/chat/chat';

let animationFrameID;
let starField;

module.exports = function(/*vnode*/) {
    return {
        oninit: function(/*vnode*/) {
            // console.log('initialized');
            AppActions.startup();
        },

        oncreate: function(/*vnode*/) {
            // console.log('DOM created');

            // inititalize PixiJS
            const app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
                view: document.getElementById('pixi-canvas'),
                backgroundColor: 0x000000, 
                antialias: true,
                resolution: window.devicePixelRatio || 1,
                autoResize: true,
                roundPixels: false
            });
            PIXI.stage = app.stage;
            PIXI.stage._width = window.innerWidth;
            PIXI.stage._height = window.innerHeight;
            starField = new StarField();
            PIXI.stage.addChild(starField);

            // kickoff animation loop
            animationFrameID = requestAnimationFrame(onAnimationFrame);
        },

        onbeforeupdate(/*vnode, old*/) {
            // console.log('onbeforeupdate');
            return true;
        },

        onupdate: function(/*vnode*/) {
            // console.log('DOM updated');
        },

        onbeforeremove: function(/*vnode*/) {
            // console.log('exit animation can start');
            return new Promise(function(resolve) {
                // call after animation completes
                resolve();
            });
        },

        onremove: function(/*vnode*/) {
            // console.log('removing DOM element');
            cancelAnimationFrame(animationFrameID)
        },

        view: function(/*vnode*/) {
            return m('div', [
                m(VelocityPanel),
                // m('div', {style:{color: 'white'}}, '..w: '+window.innerWidth),
                // m('div', {style:{color: 'white'}}, '..h: '+window.innerHeight),
                m(Chat)
            ]);
        }
    };
};

function onAnimationFrame() {
    starField.update();
    animationFrameID = requestAnimationFrame(onAnimationFrame);
}