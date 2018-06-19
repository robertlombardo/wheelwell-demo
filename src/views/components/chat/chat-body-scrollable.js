import ChatStore from 'flux/stores/chat-store';

const state = {
    chatMessageCache: [],
    channel: 'global'
};

module.exports = {
    oninit: function(/*vnode*/) {
        state.chatMessageCache = ChatStore.getAll().messageCache;
        ChatStore.on(ChatStore.NEW_MESSAGE, this.onNewChatMessage);
    },

    onupdate: function(vnode) {
        vnode.dom.scrollTop = vnode.dom.scrollHeight;
    },

    onremove: function() {
        ChatStore.removeListener(ChatStore.NEW_MESSAGE, this.onNewChatMessage);
    },

    onNewChatMessage: function() {
        state.chatMessageCache = ChatStore.getAll().messageCache;
        m.redraw();
    },

    view: function() {
        // console.log('ChatBodyScrollable::view()');
        // console.log({state});

        return m('div', {class: 'chat-body-scroll'}, 
            m('div', {class: 'chat-body'},
                state.chatMessageCache[state.channel].map((message) => {
                    return m('div', {class: 'chat-message-field'}, [
                        m('div', {class: 'chat-display-name'}, message.user+': '),
                        m('div', {class: 'chat-msg'}, message.text)
                    ]);
                })
            )
        );
    }
};