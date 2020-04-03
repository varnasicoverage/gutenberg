/**
 * WordPress dependencies
 */
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	ObserveTyping,
	WritingFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Panel, PanelBody, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import useNavigationBlocks from './use-navigation-blocks';
import NavigationStructurePanel from './navigation-structure-panel';

export default function MenuEditor( { menuId, blockEditorSettings } ) {
	const [ blocks, setBlocks, saveBlocks ] = useNavigationBlocks( menuId );

	return (
		<div className="edit-navigation-menu-editor">
			<BlockEditorKeyboardShortcuts.Register />

			<BlockEditorProvider
				value={ blocks }
				onInput={ ( updatedBlocks ) => setBlocks( updatedBlocks ) }
				onChange={ ( updatedBlocks ) => setBlocks( updatedBlocks ) }
				settings={ {
					...blockEditorSettings,
					templateLock: 'all',
				} }
			>
				<BlockEditorKeyboardShortcuts />
				<NavigationStructurePanel blocks={ blocks } />
				<Panel
					header={
						<Button isPrimary onClick={ saveBlocks }>
							{ __( 'Save navigation' ) }
						</Button>
					}
					className="edit-navigation-menu-editor__panel"
				>
					<PanelBody title={ __( 'Navigation menu' ) }>
						<WritingFlow>
							<ObserveTyping>
								<BlockList />
							</ObserveTyping>
						</WritingFlow>
					</PanelBody>
				</Panel>
			</BlockEditorProvider>
		</div>
	);
}
