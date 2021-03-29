import {
	TextControl,
	SelectControl,
	TextareaControl,
	CheckboxControl,
	Dropdown,
	Button,
	DateTimePicker,
	DatePicker,
} from '@wordpress/components';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';
import MediaControl from './MediaControl';
import React from 'react';
import { Setting, Type } from '../api/meta';

const selectUserInterface = ( {
	type,
	...props
}: {
	type: string | string[];
	enum?: string[] | number[];
	format?: string;
	ui?: string;
} ) => {
	if ( props.ui ) {
		return props.ui;
	}
	if ( props?.format ) {
		return props.format;
	}

	if ( props?.enum?.length > 0 ) {
		return 'select';
	}

	if ( Array.isArray( type ) ) {
		return selectUserInterface( {
			type: type[ 0 ],
			...props,
		} );
	}

	if ( type === 'boolean' ) {
		return 'checkbox';
	}

	if ( [ 'number', 'integer' ].includes( type ) ) {
		return 'number';
	}

	return type;
};

const Control: React.FC< {
	name: string;
	oneOf?: Setting[];
	anyOf?: Setting[];
	type?: Type | Type[];
	label: string;
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	value: any;
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	onChange: ( v: any ) => void;
	format?: string;
	enum?: string[] | number[];
	[ p: string ]: string | number | string[] | number[] | unknown[] | unknown;
} > = ( { name, type, label, value, onChange, format, ...props } ) => {
	const controlType = selectUserInterface( {
		...props,
		type,
		format,
	} );
	switch ( controlType ) {
		case 'image': {
			return (
				<MediaControl
					type="image"
					label={ label }
					value={ value }
					onChange={ onChange }
				/>
			);
		}
		case 'attachment': {
			return (
				<MediaControl
					type="attachment"
					label={ label }
					value={ value }
					onChange={ onChange }
				/>
			);
		}
		case 'hex-color': {
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
		case 'date': {
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
							<DatePicker
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
				<CheckboxControl
					{ ...props }
					name={ name }
					label={ label }
					checked={ value }
					onChange={ onChange }
				/>
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
					options={ ( props.enum || [] ).map( ( v ) => ( {
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
