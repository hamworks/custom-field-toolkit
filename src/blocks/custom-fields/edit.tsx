import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import PostMetaControls from '../../components/PostMetaControls';
const Edit: React.FC = () => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<PostMetaControls />
		</div>
	);
};

export default Edit;
