<?php
/**
 * Server-side rendering of the `core/post-author` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/post-author` block on the server.
 *
 * @return string Returns the filtered post author for the current post wrapped inside "h6" tags.
 */
function render_block_core_post_author( $attributes ) {
	$post = gutenberg_get_post_from_context();

	if ( ! $post ) {
		return '';
	}

	$avatar = get_avatar(
		$post->post_author,
		$attributes['avatarSize']
	);

	$has_first_or_last_name = ! empty( $attributes['firstName'] ) || ! empty( $attributes['lastName'] );

	$author_name = $attributes['name'];
	if ( $attributes['showDisplayName'] && $has_first_or_last_name ) {
		$author_name = $attributes['firstName'] . ' ' . $attributes['lastName'];
	}

	$byline = ! empty( $attributes['byline'] ) ? $attributes['byline'] : __( 'Written by:' );

	return '<div class="wp-block-post-author">' .
		( $attributes['showByline'] ? '<p class="wp-block-post-author__byline">' . $byline . '</p>' : '' ) .
		( $attributes['showAvatar'] ? '<div class="wp-block-post-author__avatar">' . $avatar . '</div>' : '' ) .
		'<div class="wp-block-post-author__content">' .
			'<p class="wp-block-post-author__name">' . $author_name . '</p>' .
			( $attributes['showBio'] ? '<p class="wp-block-post-author__bio">' . $attributes['description'] . '</p>' : '' ) .
		'</div>' .
	'</div>';
}

/**
 * Registers the `core/post-author` block on the server.
 */
function register_block_core_post_author() {
	$path     = __DIR__ . '/post-author/block.json';
	$metadata = json_decode( file_get_contents( $path ), true );

	register_block_type(
		$metadata['name'],
		array_merge(
			$metadata,
			array(
				'render_callback' => 'render_block_core_post_author',
			)
		)
	);
}
add_action( 'init', 'register_block_core_post_author' );
