<?php if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); } if (CFCT_DEBUG) { cfct_banner(__FILE__); } wp_footer(); ?>    
    <?php global $post; ?>
    
    <?php if($post->post_name == 'single-pedestal-table') : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/single-ped-script.js"></script>
    <?php endif; ?>
    
    <?php if($post->post_name == 'leg-table') : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/leg-script.js"></script>
    <?php endif; ?>
    
    <?php if(is_page('collections')) : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/mandrill.js"></script>
    <?php endif; ?>
    
    <?php if($post->post_name == 'chair') : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/chair-script.js"></script>
    <?php endif; ?>
    
    <?php if($post->post_name == 'double-pedestal-table') : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/double-ped-script.js"></script>
    <?php endif; ?>
    
    <?php if($post->post_name == 'trestle-table') : ?>
    <script src="<?php bloginfo('template_directory'); ?>/js/trestle-script.js"></script>
    <?php endif; ?>
    
	</div><!-- remodal-bg -->
	</body>
</html>