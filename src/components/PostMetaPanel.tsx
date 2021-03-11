import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import PostMetaControls from './PostMetaControls';
import { useEffect, useState } from '@wordpress/element';
import { Property } from '../types/Property';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const PostMetaPanel: React.FC = () => {
	const postType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	const restBase = useSelect(
		( select ) => {
			const { rest_base: postTypeRestBase } =
				select( 'core' ).getPostType( postType ) || {};
			return postTypeRestBase;
		},
		[ postType ]
	);

	const [ properties, setProperties ] = useState< {
		[ key: string ]: Property;
	} >( {} );

	useEffect( () => {
		const fetchMetaProps = async () => {
			if ( restBase ) {
				const apiDocs = await apiFetch( { path: '/wp/v2' } );
				const endpoints =
					apiDocs.routes[ `/wp/v2/${ restBase }/(?P<id>[\\d]+)` ]
						.endpoints;
				const endpoint = endpoints.find( ( { methods } ) =>
					methods.includes( 'POST' )
				);
				setProperties( endpoint.args.meta.properties );
			}
		};
		fetchMetaProps();
	}, [ restBase ] );

	return (
		<>
			<PluginDocumentSettingPanel title={ __( 'Custom fields' ) } initialOpen={ true }>
				<PostMetaControls
					postType={ postType }
					properties={ properties }
				/>
			</PluginDocumentSettingPanel>
		</>
	);
};

export default PostMetaPanel;
