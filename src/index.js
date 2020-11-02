import { registerPlugin } from '@wordpress/plugins';
import PostMetaPanel from './components/PostMetaPanel';

export const registerMetaBox = ( { name, icon, title, fields } ) => {
	registerPlugin( name, {
		icon,
		render: () => <PostMetaPanel title={ title } fields={ fields } />,
	} );
};
