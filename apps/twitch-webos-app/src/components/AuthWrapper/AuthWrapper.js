import localforage from "localforage";
import { useEffect } from "react";
import { Button } from '@enact/sandstone/Button';
import { useState } from "react";
import { Panel } from "@enact/sandstone/Panels";
import { BodyText } from "@enact/sandstone/BodyText";

function AuthWrapper({ children }) {
  const [accesstoken, setAccessToken] = useState("");
  
  const authenticate = () => {
    window.open(`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITCH_REDIRECT_URL}&scope=chat:read+chat:edit+user:edit:follows+user:read:subscriptions+user:read:chat+user:write:chat+user:read:emotes&state=c3ab8aa609ea11e793ae92361f002671`, '_blank');
  }

  useEffect(() => {
    if(window.location.hash && window.location.hash.includes("access_token")) {
      const token = window.location.hash.split("&")[0].split("=")[1];

      localforage.setItem("accessToken", token);
      setAccessToken(token);
    }
  }, [window.location.hash]);

  return (
    !accesstoken.length ? (
      <Panel>
        <BodyText centered>
          Connect your Twitch account to use this app.
        </BodyText>
        <Button onClick={authenticate}>Autenticar com Twitch</Button>
      </Panel>
    ) : children
  );
}

export default AuthWrapper;