import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import PostMetaControls from '../components/PostMetaControls';
import { Placeholder } from '@wordpress/components';
const Edit: React.FC = () => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Placeholder>
				<div>
					<PostMetaControls />
				</div>
			</Placeholder>
		</div>
	);
};

export default Edit;
