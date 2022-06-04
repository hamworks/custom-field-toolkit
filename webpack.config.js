// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require( 'path' );
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		plugin: path.resolve( process.cwd(), 'src', 'plugin.js' ),
	},
};
