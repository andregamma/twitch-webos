import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

const ChatMessageBase = kind({
	name: 'ChatMessage',

	propTypes: {
		username: PropTypes.string,
		message: PropTypes.string,
		badges: PropTypes.string,
    usernameColor: PropTypes.string,
		showBadges: PropTypes.bool,
	},

	render: (props) => (
		<div style={{ fontSize: 16 }}>
			{props.showBadges && <span style={{ fontWeight: 'bold', color: '#FF0000', marginRight: 2 }} dangerouslySetInnerHTML={{ __html: props.badges }}></span>}
			<span style={{ fontWeight: 'bold', color: props.usernameColor ?? '#FFF', marginRight: 2, lineHeight: 0.5}}>{props.username}:</span>
      <span dangerouslySetInnerHTML={{ __html: props.message}}>
      </span>
		</div>
	)
});

export default ChatMessageBase;
export {ChatMessageBase as ChatMessage};