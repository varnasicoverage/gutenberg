/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { useMemo, useCallback } from '@wordpress/element';
import { parse, cloneBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockPreview from '../block-preview';

function BlockPattern( { pattern, onClick } ) {
	const { title, content } = pattern;
	const blocks = useMemo( () => parse( content ), [ content ] );

	return (
		<div
			className="block-editor-inserter__patterns-item"
			role="button"
			onClick={ () => onClick( pattern, blocks ) }
			onKeyDown={ ( event ) => {
				if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
					onClick( blocks );
				}
			} }
			tabIndex={ 0 }
		>
			<div className="block-editor-inserter__patterns-item-preview">
				<BlockPreview blocks={ blocks } autoHeight />
			</div>
			<div className="block-editor-inserter__patterns-item-title">
				{ title }
			</div>
		</div>
	);
}

function BlockPatterns( { patterns, onInsert } ) {
	const { createSuccessNotice } = useDispatch( 'core/notices' );
	const onClickPattern = useCallback( ( pattern, blocks ) => {
		onInsert( map( blocks, ( block ) => cloneBlock( block ) ) );
		createSuccessNotice(
			sprintf(
				/* translators: %s: block pattern title. */
				__( 'Pattern "%s" inserted.' ),
				pattern.title
			),
			{
				type: 'snackbar',
			}
		);
	}, [] );

	return (
		<div className="block-editor-inserter__patterns">
			{ patterns.map( ( pattern, patternIndex ) => (
				<BlockPattern
					key={ patternIndex }
					pattern={ pattern }
					onClick={ onClickPattern }
				/>
			) ) }
		</div>
	);
}

export default BlockPatterns;
