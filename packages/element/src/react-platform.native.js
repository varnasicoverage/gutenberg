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
import { cloneElement } from './react';

const render = ( element ) => ( propsFromNative ) => {
	doAction( 'native.render', propsFromNative );

	// if we have not received props from a parent native app
	// just render the element as it is
	if ( isEmpty( omit( propsFromNative, [ 'rootTag' ] ) ) ) {
		return element;
	}

	// Otherwise overwrite the existing props using a filter hook
	const filteredProps = applyFilters(
		'native.block_editor_props',
		propsFromNative
	);

	return cloneElement( element, filteredProps );
};

/**
 * Render a given element on Native.
 * This actually returns a componentProvider that can be registered with `AppRegistry.registerComponent`
 *
 * @param {WPElement}   element Element to render.
 */
export { render };
