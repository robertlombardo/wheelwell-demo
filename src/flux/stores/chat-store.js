import EventEmitter from 'events';
import AppDispatcher from 'flux/app-dispatcher';
import io from 'socket.io-client';

let chatSocket;
let currentChannel = 'global';
const userId = Math.random().toString();
const username = 'Test User ' + Math.floor(Math.random()*1000);
const textColor = Math.random()*0xffffff;

// the stuff we serve
const messageCache = {
    global: [ 
        {user:'Welcome-Bot', text:'Welcome to the MithrilJS Chat Demo!', color:'white'},
        {user:'Your Conscience', text:'Wow look how smart this Rob guy is. We should hire him :)', color:'white'}
    ]
};

const ChatStore = Object.assign( {}, EventEmitter.prototype, {
   NEW_MESSAGE: 'NEW_MESSAGE',

    getAll: function() {
      return {
         messageCache
      };
    }
});
export default ChatStore;

const HANDLERS = {
    [AppDispatcher.STARTUP]: onStartup,
    [AppDispatcher.ENTER_CHAT_MESSAGE]: onChatMessageEntered 
}; 

AppDispatcher.register( (payload) => {
    if( HANDLERS[payload.action.actionType] ) {
        HANDLERS[payload.action.actionType]( payload.action );
    }
    return true;
});

function onStartup() {
	// console.log('ChatStore::onStartup()');
	try {
        // console.log( 'Config.SERVER_ADDRESS: ' + Config.SERVER_ADDRESS, true );
        chatSocket = io('https://chat-server-any-origin.herokuapp.com/', { // 'http://localhost:8081', { // Config.CHAT_SERVER_ADDRESS, {
            path: "/socket.io",
            secure: true,
            transports: ['websocket']
        });        

        chatSocket.on('error', console.error);

        chatSocket.on('connected', onChatSocketConnected);
    } catch( error ) {
        console.error('Error in ChatStore::onStartup()');
        console.error(error);
        setTimeout(startup, 5000);
        return;
    }
}

function onChatSocketConnected() {
	// console.log('ChatStore::onChatSocketConnected()');
  if( !chatSocket.listeners('subscribed')[0] ) {
      chatSocket.on( 'subscribed', onSubscribed );
      chatSocket.on( 'chatMessage', onChatMessage );
  }

  chatSocket.emit('subscribe', {
      userId,
      channel: 'global'
  });
}

function onSubscribed(data) {
  publish({ 
      user: username,
      text: "Knock knock who's there?",
      color: textColor
  });
}

function onChatMessage(data) {
  pushToLog(data.channel, data.message);
}

function onChatMessageEntered(action) {
  // console.log('ChatStore::onChatMessageEntered()');
  // console.log({action});

  publish( action.channel, {
    user: username,
    text: action.input,
    color: textColor
  });
}

function publish(channel, message) { 
  // console.log('ChatStore::publish()');
  // console.log({message});

  chatSocket.emit('publish', {
      channel,        
      message
  });
}

function onChatMessage(data) {
  pushToLog(data.channel, data.message);
}

function pushToLog(channel, message) {
    messageCache[channel].push(message);
    ChatStore.emit(ChatStore.NEW_MESSAGE);
}