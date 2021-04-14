import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Type =
	| 'string'
	| 'boolean'
	| 'integer'
	| 'number'
	| 'array'
	| 'object'
	| 'null';

type Context = 'view' | 'edit' | 'embed';

type Properties = {
	[ p: string ]: Setting;
};

export type Setting = {
	oneOf?: Setting[];
	anyOf?: Setting[];
	title?: string;
	description?: string;
	default: unknown;
	type?: Type | Type[];
	context?: Context;
	format?: string;
	required?: boolean;
	enum?: string[] | number[];
	properties?: Properties;
	items?: Setting;
};

type Endpoint = {
	methods: Method[];
	args: {
		[ k: string ]: Setting;
	};
};

type Route = {
	namespace: string;
	methods: Method[];
	endpoints: Endpoint[];
};

export const fetchRegisteredPostMeta = async (
	restBase: string
): Promise< Endpoint > => {
	const apiDocs: {
		routes: { [ namespace: string ]: Route };
	} = await apiFetch( { path: '/wp/v2' } );
	const endpoints =
		apiDocs.routes[ `/wp/v2/${ restBase }/(?P<id>[\\d]+)` ]?.endpoints ||
		[];
	return endpoints.find( ( { methods } ) => methods.includes( 'POST' ) );
};

export const useRegisteredPostMeta = ( postType: string ): Properties => {
	const [ properties, setProperties ] = useState< Properties >( null );
	const restBase = useSelect(
		( select ) => {
			const { rest_base: postTypeRestBase } =
				select( 'core' ).getPostType( postType ) || {};
			return postTypeRestBase;
		},
		[ postType ]
	);
	useEffect( () => {
		if ( ! properties && restBase ) {
			fetchRegisteredPostMeta( restBase ).then( ( endpoint ) => {
				setProperties( endpoint.args.meta.properties );
			} );
		}
	}, [ restBase ] );

	return properties || {};
};
