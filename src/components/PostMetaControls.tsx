import { useEntityProp } from '@wordpress/core-data';

import Control from './Control';
import { Property } from '../types/Property';
import React from 'react';

const PostMetaControls: React.FC< {
	postType: string;
	properties: {
		[ key: string ]: Property;
	};
} > = ( { postType, properties } ) => {
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	return (
		<>
			{ Object.entries( properties ).map(
				( [
					key,
					{ description, type, default: defaultValue, ...props },
				] ) => {
					const updateValue = ( value ) => {
						setMeta( { ...meta, [ key ]: value } );
					};
					return (
						<Control
							key={ key }
							name={ key }
							type={ type }
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
