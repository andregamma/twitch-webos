import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import MainPanel from '../views/MainPanel';

import './attachErrorHandler';

import css from './App.module.less';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';

const AppBase = kind({
	name: 'App',
	propTypes: {
		channel: PropTypes.string,
		onChannelChange: PropTypes.func,
	},
	defaultProps: {
		channel: '',
	},
	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Panels {...props}>
			<MainPanel channel={props.channel} onChannelChange={props.onChannelChange} />
		</Panels>
	)
});

const App = Changeable({prop: 'channel', change: 'onChannelChange'}, ThemeDecorator(AppBase));

export default App;
