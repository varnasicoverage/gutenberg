/**
 * External dependencies
 */
import { isEmpty, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { applyFilters, doAction } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { cloneElement, useEffect } from './react';

const render = ( element ) => ( propsFromNative ) => {
	useEffect( () => {
		doAction( 'native.init', propsFromNative );
	}, [] );

	useEffect( () => {
		doAction( 'native.render', propsFromNative );
	} );

	// if we have not received props from a parent native app
	// just render the element as it is
	if ( isEmpty( omit( propsFromNative, [ 'rootTag' ] ) ) ) {
		return element;
	}

	// Otherwise overwrite the existing props using a filter hook
	let filteredProps = null;

	useEffect( () => {
		filteredProps = applyFilters(
			'native.block_editor_props',
			propsFromNative
		);
	}, [] );

	if ( ! filteredProps ) {
		return null;
	}

	return cloneElement( element, filteredProps );
};

/**
 * Renders a given element into the target DOM node.
 *
 * @param {WPElement}   element Element to render.
 * @param {HTMLElement} target  DOM node into which element should be rendered.
 */
export { render };
