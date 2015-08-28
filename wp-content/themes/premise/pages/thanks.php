<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

get_header(); ?>

<section id="thanks">

    <div class="container collections-container">
        
        <div class="row">
            <div class="col-md-12">
                <div class="step-header">
                    <h2>Thanks for finalizing your order!</h2>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <div class="content-wrapper">
                    <p>At this point, you're all wrapped up. You should:</p>
                    <ol>
                        <li>Head back to the home page.</li>
                        <li>Find a sales representative and have them assist your in making a purchase.</li>
                    </ol>
                    <p>That's it! Thanks to much for choosing Conrad Grebel!</p>
                    <a class="button" href="<?php bloginfo('url'); ?>">Head back to the home screen</a>
                </div>
            </div>
        </div>
        
    </div>

</section>

<script>
    window.setTimeout( function(){
        window.location = "<?php echo bloginfo('url'); ?>";
    }, 30000 );
</script>

<?php get_footer(); ?>