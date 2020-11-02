import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import Control from './Control.js';

/**
 * @typedef {{key: string, type: string, description: string, default: string}} Field
 */

/**
 * Controls Component.
 *
 * @param {Object}  props Component props.
 * @param {Field[]} props.fields
 * @param {string} props.postType
 */
const Controls = ( { postType, fields } ) => {
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	return (
		<>
			{ fields.map(
				( {
					key,
					description,
					type,
					input_type: inputType,
					default: defaultValue,
					props: props,
				} ) => {
					const updateValue = ( value ) => {
						setMeta( { ...meta, [ key ]: value } );
					};

					return (
						<div
							className={ 'components-panel__row' }
							key={ key }
							style={ { display: 'block' } }
						>
							<Control
								{ ...props }
								type={ type }
								inputType={ inputType }
								label={ description }
								value={ meta[ key ] ?? defaultValue }
								onChange={ updateValue }
							/>
						</div>
					);
				}
			) }
		</>
	);
};

const PostMetaPanel = ( { title, fields } ) => {
	const currentPostType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	return (
		<PluginDocumentSettingPanel title={ title } initialOpen={ true }>
			<Controls postType={ currentPostType } fields={ fields } />
		</PluginDocumentSettingPanel>
	);
};

export default PostMetaPanel;
