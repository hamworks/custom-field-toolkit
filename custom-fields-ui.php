<?php

/*
Plugin Name: Custom Fields Ui
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: A brief description of the Plugin.
Version: 1.0
Author: torounit
Author URI: http://URI_Of_The_Plugin_Author
License: A "Slug" license name e.g. GPL2
*/

require_once __DIR__ . '/vendor/autoload.php';

add_action( 'admin_enqueue_scripts', function() {
	$asset_file = include __DIR__ . '/build/admin.asset.php';
	wp_enqueue_script(
		'custom-fields-ui',
		plugins_url( 'build/admin.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
});


add_action( 'init', function ( ) {
	\HAMWORKS\Custom_Fields_UI_From_JSON\Fields::create_from_json( __DIR__ . '/fields.json' , 'post');
});
