<?php

if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

?>

<section id="sidebar">
	<section id="primary-sidebar">
<?php
$post = $orig_post;
if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Primary Sidebar') ) {
?>
		<section class="widget">
			<h2 class="widget-title">Archives</h2>
			<ul>
				<?php wp_get_archives(); ?>
			</ul>
		</div>
		<section class="widget">
			<h2 class="widget-title">Pages</h2>
			<ul>
				<?php wp_list_pages('title_li='); ?>
			</ul>
		</section>
<?php
}
?>
	</section>
	<section id="secondary-sidebar">
<?php
if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Secondary Sidebar') ) { 
?>
		<section class="widget">
			<h2 class="widget-title">Search</h2>
			<?php cfct_form('search'); ?>
		</section><!--.widget-->
		<section class="widget">
			<h2 class="widget-title">Tags</h2>
			<?php wp_tag_cloud('smallest=10&largest=18&unit=px'); ?>
		</section><!--.widget-->
		<?php wp_register('<p class="sidebar-register">', '</p>'); ?> 
		<p class="sidebar-logout"><?php wp_loginout(); ?></p>

<?php
}
?>
	</section><!--#secondary-sidebar-->
</section><!--#sidebar-->
