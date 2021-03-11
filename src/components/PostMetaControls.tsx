import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import Control from './Control';
import { Property } from '../types/Property';

/**
 * Controls Component.
 *
 * @param {Object}  props Component props.
 * @param {string} props.postType
 */
export default function PostMetaControls( { postType } ) {
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const restBase = useSelect(
		( select ) => {
			const { rest_base: postTypeRestBase } =
				select( 'core' ).getPostType( postType ) || {};
			return postTypeRestBase;
		},
		[ postType ]
	);

	/**
	 * wp-api でカスタムフィールドの情報を取得する
	 */
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
}
