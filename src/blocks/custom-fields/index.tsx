import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

registerBlockType( name, {
	...metadata,
	edit,
} );
