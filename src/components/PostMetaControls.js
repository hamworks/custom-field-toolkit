import { useEntityProp } from '@wordpress/core-data';

import Control from './Control';
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
export default function PostMetaControls( { postType, fields } ) {
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	return (
		<>
			{ fields.map(
				( {
					key,
					description,
					type,
					show_in_rest: showInRest,
					default: defaultValue,
					...props
				} ) => {
					const updateValue = ( value ) => {
						setMeta( { ...meta, [ key ]: value } );
					};
					const { schema } = showInRest || {};
					return (
						<Control
							key={ key }
							name={ key }
							{ ...props }
							type={ type }
							schema={ schema }
							label={ description }
							value={ meta[ key ] ?? defaultValue }
							onChange={ updateValue }
						/>
					);
				}
			) }
		</>
	);
}
