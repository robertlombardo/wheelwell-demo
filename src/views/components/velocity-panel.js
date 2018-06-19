import StarModelStore from 'flux/stores/star-model-store';
import {Slider} from 'polythene-mithril';
import 'polythene-css';
import AppActions from 'flux/actions/app-actions';

const state = {
	cameraVelocity: 50
}

module.exports = {
	oninit: function(/*vnode*/) {
        StarModelStore.on(StarModelStore.CAMERA_VELOCITY_CHANGED, this.onCameraVelocityChanged);
    },

    onremove: function() {
        StarModelStore.removeListener(StarModelStore.CAMERA_VELOCITY_CHANGED, this.onCameraVelocityChanged);
    },

    onCameraVelocityChanged: function() {
        state.cameraVelocity = StarModelStore.getAll().cameraVelocity;
        m.redraw();
    },

    view: function() {
        return m('div', {class: 'velocity-panel'}, [
        	m('div', {class: 'velocity-display'}, 'Velocity: '+state.cameraVelocity.toFixed(2)),
        	m(Slider, {
        		min: 0,
        		max: 1,
        		stepSize: 0.001,
        		defaultValue: 0.9,
        		onChange: (data) => {
        			let {value} = data;
        			value *= Math.sqrt( 200 );
    				const newVelocity = -100 + Math.pow(value,2);
        			AppActions.setCameraVelocity(newVelocity);
        		} 
        	})
        ]);
    }
}