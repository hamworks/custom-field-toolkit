import {
	TextControl,
	SelectControl,
	TextareaControl,
	CheckboxControl,
} from '@wordpress/components';

const Control = ( {
	key,
	type,
	label,
	value,
	onChange,
	inputType,
	...props
} ) => {
	const controlType = type === 'string' ? 'text' : type;

	if ( controlType === 'boolean' ) {
		return (
			<CheckboxControl
				key={ key }
				label={ label }
				checked={ value }
				onChange={ onChange }
			/>
		);
	}

	if ( inputType === 'textarea' ) {
		return (
			<TextareaControl
				{ ...props }
				label={ label }
				value={ value }
				onChange={ onChange }
			/>
		);
	}
	if ( props.options ) {
		return (
			<SelectControl
				{ ...props }
				key={ key }
				label={ label }
				labelposition="top"
				value={ value }
				onChange={ onChange }
			/>
		);
	}

	return (
		<TextControl
			{ ...props }
			key={ key }
			type={ controlType }
			label={ label }
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default Control;
