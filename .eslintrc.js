// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require( '@wordpress/scripts/config/.eslintrc.js' );
module.exports = {
	...defaultConfig,
	parser: '@typescript-eslint/parser',
	extends: [
		...defaultConfig.extends,
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		'import/extensions': [ '.js', '.jsx', '.ts', '.tsx' ],
		'import/resolver': {
			node: {
				extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
			},
		},
	},
};
