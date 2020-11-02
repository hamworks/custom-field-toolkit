import {
	TextControl,
	SelectControl,
	TextareaControl,
	CheckboxControl,
	Dropdown,
	Button,
	DateTimePicker,
	PanelRow,
} from '@wordpress/components';

import { __experimentalColorGradientControl as ColorGradientControl } from '@wordpress/block-editor';

const selectUserInterface = ( { type, schema } ) => {
	if ( schema?.enum?.length > 0 ) {
		return 'select';
	}

	if ( type === 'boolean' ) {
		return 'checkbox';
	}

	if ( [ 'number', 'integer' ].includes( type ) ) {
		return 'number';
	}

	if ( schema?.format === 'email' ) {
		return 'email';
	}

	if ( schema?.format === 'hex-color' ) {
		return 'color';
	}

	if ( schema?.format === 'date-time' ) {
		return 'date-time';
	}

	if ( schema?.format === 'uri' ) {
		return 'url';
	}

	return type;
};

const Control = ( {
	name,
	type,
	label,
	value,
	onChange,
	schema = {},
	...props
} ) => {
	const controlType = selectUserInterface( { type, schema } );
	switch ( controlType ) {
		case 'color': {
			return (
				<ColorGradientControl
					label={ label }
					colors={ [] }
					colorValue={ value }
					onColorChange={ onChange }
				/>
			);
		}

		case 'date-time': {
			return (
				<>
					<span>{ label }</span>
					<Dropdown
						position="bottom left"
						contentClassName="edit-post-post-schedule__dialog"
						renderToggle={ ( { onToggle, isOpen } ) => (
							<>
								<Button
									className="edit-post-post-schedule__toggle"
									onClick={ onToggle }
									aria-expanded={ isOpen }
									isTertiary
								>
									{ value || 'Select datetime.' }
								</Button>
							</>
						) }
						renderContent={ () => (
							<DateTimePicker
								currentDate={ value }
								onChange={ onChange }
								is12Hour={ false }
							/>
						) }
					/>
				</>
			);
		}
		case 'checkbox': {
			return (
				<PanelRow>
					<CheckboxControl
						{ ...props }
						name={ name }
						label={ label }
						checked={ value }
						onChange={ onChange }
					/>
				</PanelRow>
			);
		}
		case 'textarea': {
			return (
				<TextareaControl
					{ ...props }
					label={ label }
					value={ value }
					onChange={ onChange }
				/>
			);
		}
		case 'select': {
			return (
				<SelectControl
					{ ...props }
					name={ name }
					label={ label }
					labelposition="top"
					value={ value }
					options={ ( schema.enum || [] ).map( ( v ) => ( {
						value: v,
						label: v,
					} ) ) }
					onChange={ onChange }
				/>
			);
		}
		case 'email':
		case 'url':
		case 'number': {
			return (
				<TextControl
					{ ...props }
					name={ name }
					type={ controlType }
					label={ label }
					value={ value || '' }
					onChange={ onChange }
				/>
			);
		}
		default: {
			return (
				<TextControl
					{ ...props }
					name={ name }
					type={ type === 'string' ? 'text' : type }
					label={ label }
					value={ value }
					onChange={ onChange }
				/>
			);
		}
	}
};

export default Control;
