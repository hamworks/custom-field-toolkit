import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import PostMetaControls from './PostMetaControls';

const PostMetaPanel = ( { title, fields } ) => {
	const currentPostType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	return (
		<PluginDocumentSettingPanel title={ title } initialOpen={ true }>
			<PostMetaControls postType={ currentPostType } fields={ fields } />
		</PluginDocumentSettingPanel>
	);
};

export default PostMetaPanel;
