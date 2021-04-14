import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import Control from './Control';
import React from 'react';
import { useRegisteredPostMeta } from '../api/meta';

const PostMetaControls: React.FC = () => {
	const postType: string = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const properties = useRegisteredPostMeta( postType );
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
	return (
		<>
			{ Object.entries( properties ).map(
				( [
					key,
					{ description, default: defaultValue, ...props },
				] ) => {
					const updateValue = ( value ) => {
						setMeta( { ...meta, [ key ]: value } );
					};
					return (
						<Control
							key={ key }
							name={ key }
							{ ...props }
							label={ description }
							value={ meta[ key ] ?? defaultValue }
							onChange={ updateValue }
						/>
					);
				}
			) }
		</>
	);
};

export default PostMetaControls;
