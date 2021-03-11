import { registerPlugin } from '@wordpress/plugins';
import PostMetaPanel from './components/PostMetaPanel';
import { title } from '../fields.json';

registerPlugin( 'meta-box', {
	icon: 'book',
	render: () => <PostMetaPanel title={ title } />,
} );
