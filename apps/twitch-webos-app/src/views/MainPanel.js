import kind from "@enact/core/kind";
import { Panel } from "@enact/sandstone/Panels";
import { TwitchEmbed } from "react-twitch-embed";
import localforage from "localforage";
import Chat from "../components/Chat/Chat";
import Input from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

if(window.location.hash) {
  localforage.setItem("accessToken", window.location.hash.split("&")[0].split("=")[1]);
  window.dispatchEvent(new Event('token_change'));
}

const MainPanel = kind({
  name: "MainPanel",
  propTypes: {
    channel: PropTypes.string,
    onChannelChange: PropTypes.func
  },
  handlers: {
    handleInputComplete: (ev, props) => {
      console.log('Channel:', ev, props);

      props.onChannelChange({ channel: ev.value });
    }
  },
  render: (props) => (
    // <AuthWrapper {...props}>
      <Panel style={{ padding: 0}}>
        {!props.channel &&
          <Input
            onComplete={props.handleInputComplete}
            placeholder="MyCoolStreamer"
            title="Channel name"
            value={props.channel}
          />
        }
        {/* <Header title="Pagina inicial" /> */}
          {props.channel ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TwitchEmbed
                channel={props.channel}
                hideControls
                withChat={false}
                style={{ flex: 1 }}
                width={"100%"}
                height={"100%"}
              />
              <section style={{ minHeight: '100vh'}}>
                <Chat channel={props.channel} />
              </section>
            </div>
          ) : (
            <span>No channel selected</span>
          )}
      </Panel>
    // </AuthWrapper>
  )
});

export default MainPanel;
