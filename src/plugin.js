import { registerPlugin } from '@wordpress/plugins';
import PostMetaPanel from './components/PostMetaPanel';

registerPlugin( 'custom-field-toolkit', {
	icon: 'admin-generic',
	render: () => <PostMetaPanel />,
} );
