const tmi = require('tmi.js');
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useEffect, useState } from 'react';
import Scroller from '@enact/sandstone/Scroller';
import { parseBadges, parseEmotes } from "emotettv";

const client = new tmi.Client({
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
});

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  let scrollTo = undefined

  useEffect(() => {
    window.addEventListener('client_change', (ev) => setConnected(true));

    client.connect().then(() => {
      window.dispatchEvent(new CustomEvent('client_change', { detail: {
        connected: true
      } }));
      console.log('CHAT: Conectado com sucesso!');
    }).catch(console.error);
  }, []);
  
  useEffect(() => {
    if(connected){
      console.log('CHAT: Conectando ao canal:', props.channel);
      client.join(props.channel).then(() => {
        setMessages([]);
        console.log('CHAT: Conectado ao canal:', props.channel);
      }).catch(console.error);
    } else {
      console.log('CHAT: não foi possível conectar ao canal:', props.channel);
    }
  }, [props.channel, connected]);

  useEffect(() => {
    client.on('message', async (channel, tags, text, self) => {
      const options = {
        channelId: tags['room-id'],
      };
    
      const badges = await parseBadges(tags.badges, tags.username, options);
      const message = await parseEmotes(text, tags.emotes, options);
    
      const htmlBadges = badges.toHTML();
      const htmlMessage = message.toHTML();
    
      const payload = {
        tags,
        htmlMessage,
        htmlBadges
      }
    
      console.info('Mensagem recebida:', payload);
      setMessages(old => [...old, payload].slice(-20));
      scrollTo({ align: 'bottom', animate: true })
    })
  }, []);
    

  return (
    <div>
      <h1>Chat</h1>
      {messages.length === 0 && <div>Carregando...</div>}
      <Scroller
        cbScrollTo={(fn) => {
          scrollTo = fn;
        }}
        direction="vertical"
        verticalScrollbar="hidden"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: 350,
            maxHeight: "70vh",
          }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.tags.id}
              username={message.tags.username}
              message={message.htmlMessage}
              badges={message.htmlBadges}
              showBadges={true}
              usernameColor={message.tags.color}
            />
          ))}
        </div>
      </Scroller>
    </div>
  );
}

export default Chat;