import { Button, PanelRow, BaseControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import React from 'react';

const MediaControl: React.FC< {
	label: string;
	value: number | string;
	onChange: ( v: number | string ) => void;
	type: 'attachment' | 'image';
} > = ( { label, value, onChange, type = 'attachment' } ) => {
	const instanceId = useInstanceId( MediaControl );
	const id = `inspector-media-control-${ instanceId }`;
	const attachment = useSelect(
		( select ) => {
			if ( value ) {
				const { getMedia } = select( 'core' );
				return getMedia( value );
			}
			return null;
		},
		[ value ]
	);

	const Preview = ( { open } ) => {
		return type === 'image' ? (
			<button
				onClick={ open }
				id={ id }
				style={ {
					background: 'transparent',
					padding: 0,
					border: 'none',
				} }
			>
				<img
					src={ attachment?.source_url }
					alt={ attachment?.alt_text }
				/>
			</button>
		) : (
			<Button
				isLink
				isTertiary
				icon={ 'media-document' }
				onClick={ open }
			>
				{ attachment?.title?.rendered }
			</Button>
		);
	};

	return (
		<PanelRow>
			<BaseControl label={ label } id={ id }>
				<>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								onChange( media.id );
							} }
							value={ value ? value : '' }
							render={ ( { open } ) =>
								value ? (
									<div>
										<Preview open={ open } />
										<Button
											isTertiary
											onClick={ () => {
												onChange( '' );
											} }
										>
											{ __( 'Remove' ) }
										</Button>
									</div>
								) : (
									<Button
										isTertiary
										onClick={ open }
										id={ id }
									>
										{ __( 'Upload' ) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</>
			</BaseControl>
		</PanelRow>
	);
};

export default MediaControl;
