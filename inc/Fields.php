<?php

namespace HAMWORKS\Custom_Field_Toolkit;

/**
 * Class Fields
 */
class Fields {
	/**
	 * @var array
	 */
	private $fields;

	/**
	 * @var string
	 */
	private $post_type = '';

	/**
	 * Factory method.
	 *
	 * @param string $field_data_file
	 */
	public static function create_from_json( string $field_data_file ) {
		$data      = json_decode( file_get_contents( $field_data_file ), true );
		$post_type = $data['post_type'] ?? '';
		new Fields( $data['fields'], $post_type );
	}

	/**
	 * Factory constructor.
	 *
	 * @param array $fields
	 * @param string $post_type
	 */
	public function __construct( array $fields, $post_type = '' ) {
		$this->fields    = $fields;
		$this->post_type = $post_type;
		$this->register_fields();
	}

	/**
	 * Register fields.
	 */
	private function register_fields() {
		foreach ( $this->get_fields() as $field ) {
			$this->register_field( $field );
		}
	}

	/**
	 * Register post meta.
	 *
	 * @param $field
	 */
	private function register_field( $field ) {
		$default = array(
			'single'       => true,
			'show_in_rest' => true,
		);

		if ( is_protected_meta( $field['key'] ) ) {
			$default['auth_callback'] = function ( $allowed, $meta_key, $post_ID, $user_id, $cap, $caps ) {
				return current_user_can( 'edit_post', $post_ID );
			};
		}

		$args = array_merge( $default, (array) $field );
		register_post_meta( $this->post_type, $field['key'], $args );
	}

	/**
	 * @return array
	 */
	private function get_fields(): array {
		return $this->fields;
	}
}
