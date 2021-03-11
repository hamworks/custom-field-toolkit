<?php
/**
 * Plugin Name: Custom Field UI for Block Editor
 * Plugin URI: https://github.com/team-hamworks/custom-field-ui-for-block-editor
 * Description: Custom Field UI for Block Editor.
 * Version: 0.0.0
 * Author: HAMWORKS
 * Author URI: https://github.com/team-hamworks/
 * License: GPL2 or later
 **/

use HAMWORKS\Custom_Field_UI_For_Block_Editor\Fields as Fields;

require_once __DIR__ . '/vendor/autoload.php';

add_action(
	'admin_enqueue_scripts',
	function() {
		$asset_file = include __DIR__ . '/build/index.asset.php';
		wp_enqueue_script(
			'custom-field-ui-for-block-editor',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
);


add_action(
	'init',
	function () {
		if ( defined( 'HW_CUSTOM_FIELD_UI_FOR_BLOCK_EDITOR_DEV' ) && HW_CUSTOM_FIELD_UI_FOR_BLOCK_EDITOR_DEV ) {
			Fields::create_from_json( __DIR__ . '/fields.json' );
		}
	}
);
