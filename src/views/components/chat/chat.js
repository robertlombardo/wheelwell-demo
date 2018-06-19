import ChatBodyScrollable from './chat-body-scrollable';
import ChatActions from 'flux/actions/chat-actions';

const state = {
    expanded: false,
    channel: 'global',
    input: ''
};

module.exports = {
    view: function() {
        return m('div', {
            class: 'chat-root'+(state.expanded?' chat-root-max':'')
        }, [
            m('a', {
                class: 'btn size-toggle-btn'+(state.expanded?' size-toggle-btn-max':''),
                style: {color: state.expanded?'red':'green'},
                onclick: () => {state.expanded = !state.expanded}
            }, state.expanded?'-':'+'),
            m('div', {class: 'chat'+(state.expanded?' chat-max':'')}, [
                m('div', {class: 'chat-body-wrapper'+(state.expanded?' chat-body-wrapper-max':'')}, [
                    m(ChatBodyScrollable)
                ]),
                m('form', {
                    class: 'chat-input-form',
                    onsubmit: onTextEntered
                }, [
                    m('ul', {class: 'form-list'}, [
                        m('li', {class: 'msg-input-li'}, [
                            m('textarea', {
                                class: 'form-control msg-input',
                                id: 'chatInputTextArea',
                                placeholder: 'Say something...',
                                oninput: (event) => {state.input = event.target.value;},
                                onkeypress: (event) => {
                                    if(event.which===13 && !event.shiftKey) { 
                                        // enter key submits
                                        event.preventDefault();       
                                        onTextEntered(event);
                                        return false;
                                    }
                                }
                            })
                        ]),
                        m('li', {}, [
                            m('div', {}, [
                                m('button.button[type=submit]', {
                                    class: 'form-control btn btn-xs submit-btn'
                                }, 'send')
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    },
};

function onTextEntered(event) {
    // no page reload
    event.preventDefault();

    const {channel, input} = state;
    if(input !== '') {
        ChatActions.enterMessage(channel, input);
    }
        
    // clear the field
    document.getElementById('chatInputTextArea').value = '';
}