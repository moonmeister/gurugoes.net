<?php
add_theme_support('post-thumbnails');

add_filter('graphql_query_analyzer_get_headers', function ($headers) {
	$headers['Surrogate-Key'] = $headers['X-GraphQL-Keys'];

	unset($headers['X-GraphQL-Keys']);
	return $headers;
});

add_filter('ure_supress_administrators_protection', function ($switch_off) {

	$switch_off = true;

	return $switch_off;
}, 10, 1);
