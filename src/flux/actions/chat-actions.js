import AppDispatcher from 'flux/app-dispatcher';

const ChatActions = {
    enterMessage: function(channel, input) {
        AppDispatcher.handleAppAction({
            actionType: AppDispatcher.ENTER_CHAT_MESSAGE,
            channel,
            input
        });
    }
}
module.exports = ChatActions