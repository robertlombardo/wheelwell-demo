import {Dispatcher} from 'flux';

const AppDispatcher = Object.assign(new Dispatcher(), {
	NAME: 'APP_DISPATCHER',

	STARTUP: 'STARTUP',
	SET_CAMERA_VELOCITY: 'SET_CAMERA_VELOCITY',
	ENTER_CHAT_MESSAGE: 'ENTER_CHAT_MESSAGE',

    handleAppAction: function(action) {
        this.dispatch({
            source: AppDispatcher.NAME,
            action
        });
    }
});
module.exports = AppDispatcher;