import { registerPlugin } from '@wordpress/plugins';
import PostMetaPanel from './components/PostMetaPanel';

registerPlugin( 'custom-field-ui', {
	icon: 'admin-generic',
	render: () => <PostMetaPanel />,
} );
