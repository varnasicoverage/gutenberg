/**
 * WordPress dependencies
 */
import {
	PostTitle,
	VisualEditorGlobalKeyboardShortcuts,
	__experimentalUseResizeCanvas,
} from '@wordpress/editor';
import {
	WritingFlow,
	Typewriter,
	ObserveTyping,
	BlockList,
	CopyHandler,
	BlockSelectionClearer,
	MultiSelectScrollIntoView,
	__experimentalBlockSettingsMenuFirstItem,
} from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockInspectorButton from './block-inspector-button';

function VisualEditor() {
	const inlineStyles = __experimentalUseResizeCanvas();

	return (
		<BlockSelectionClearer
			className="edit-post-visual-editor editor-styles-wrapper"
			style={ inlineStyles }
		>
			<VisualEditorGlobalKeyboardShortcuts />
			<MultiSelectScrollIntoView />
			<Popover.Slot name="block-toolbar" />
			<Typewriter>
				<CopyHandler>
					<WritingFlow>
						<ObserveTyping>
							<CopyHandler>
								<div className="edit-post-visual-editor__post-title-wrapper">
									<PostTitle />
								</div>
								<BlockList />
							</CopyHandler>
						</ObserveTyping>
					</WritingFlow>
				</CopyHandler>
			</Typewriter>
			<__experimentalBlockSettingsMenuFirstItem>
				{ ( { onClose } ) => (
					<BlockInspectorButton onClick={ onClose } />
				) }
			</__experimentalBlockSettingsMenuFirstItem>
		</BlockSelectionClearer>
	);
}

export default VisualEditor;
