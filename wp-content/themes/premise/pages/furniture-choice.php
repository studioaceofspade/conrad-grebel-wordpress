<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

get_header(); ?>

<section id="furniture-type">

    <div class="container furniture-container">
    
        <div class="row">
            <div class="col-md-12">
                <h1 class="header"><?php the_field('header'); ?></h1>
            </div>
        </div>
    
        <?php 
        $posts = get_field('furniture');
        if($posts): ?>
        <div class="row">
            <?php foreach($posts as $post) : setup_postdata($post);; ?>
            <div class="col-md-4 furniture-type">
                <div class="box">
                    <div class="image">
                        <img src="<?php the_field('photo'); ?>">
                    </div>
                    <div class="bar">
                        <h2 class="title"><?php the_title(); ?></h2>
                        <a href="<?php the_permalink(); ?>" class="button trigger-reset">
                            <span>start</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
        <?php endif; ?>
    </div>

</section>

<div class="remodal reset-collection" data-remodal-id="reset-collection">
    <h1>Hold on a second!</h1>
    <p>It looks like there are already items in your collection!</p>
    <a href="#" class="button continue-collection">Add to the collection</a>
    <a href="#" class="button clear-collection">Start fresh</a>
</div>



<?php get_footer(); ?>
<script>
(function($) { 
    $(document).ready(function() {
        
        var $button;
        
        $('.trigger-reset').click(function(e) {
            e.preventDefault();
            
            $button = $(this);
            
            if(localStorage.getItem('builds')) {
                $('[data-remodal-id="reset-collection"]').remodal().open();
            } else {
                window.location.href = $(this).attr('href');
            }
            
        });
        
        $('.clear-collection').click(function(e) {
           if($button.length > 0) {
               localStorage.clear();
               window.location.href = $button.attr('href');
           }
        });
        
        $('.continue-collection').click(function(e) {
           if($button.length > 0) {
               window.location.href = $button.attr('href');
           }
        });
        
    });

})( jQuery )
</script>