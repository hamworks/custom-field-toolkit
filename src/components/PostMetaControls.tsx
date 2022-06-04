import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import Control from './Control';
import React from 'react';
import { useRegisteredPostMeta } from '../api/meta';

const PostMetaControl: React.FC< {
	metaKey: string;
	description: string;
	defaultValue: unknown;
} > = ( { metaKey, description, defaultValue, ...props } ) => {
	const postType: string = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const value = meta[ metaKey ] ?? defaultValue;

	const updateValue = ( newValue ) => {
		setMeta( { ...meta, [ metaKey ]: newValue } );
	};

	return (
		<Control
			key={ metaKey }
			name={ metaKey }
			{ ...props }
			label={ description }
			value={ value }
			onChange={ updateValue }
		/>
	);
};

const PostMetaControls: React.FC = () => {
	const postType: string = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const properties = useRegisteredPostMeta( postType );
	return (
		<>
			{ Object.entries( properties ).map(
				( [
					key,
					{ description, default: defaultValue, ...props },
				] ) => {
					return (
						<PostMetaControl
							{ ...props }
							key={ key }
							metaKey={ key }
							description={ description }
							defaultValue={ defaultValue }
						/>
					);
				}
			) }
		</>
	);
};

export default PostMetaControls;
