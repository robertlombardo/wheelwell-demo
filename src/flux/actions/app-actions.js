import AppDispatcher from 'flux/app-dispatcher';

const AppActions = {
	startup: () => {
		AppDispatcher.handleAppAction({
			actionType: AppDispatcher.STARTUP
		})
	},

	setCameraVelocity: (newVelocity) => {
		AppDispatcher.handleAppAction({
			actionType: AppDispatcher.SET_CAMERA_VELOCITY,
			newVelocity
		})
	}
};
module.exports = AppActions;