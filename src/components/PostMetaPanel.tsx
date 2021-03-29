import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import PostMetaControls from './PostMetaControls';
import { __ } from '@wordpress/i18n';

const PostMetaPanel: React.FC = () => (
	<PluginDocumentSettingPanel
		title={ __( 'Custom fields' ) }
		initialOpen={ true }
	>
		<PostMetaControls />
	</PluginDocumentSettingPanel>
);

export default PostMetaPanel;
