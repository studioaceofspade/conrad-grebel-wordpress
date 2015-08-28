<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }
get_header(); ?>

<section id="home">
    <div class="container home-container">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="image">
                        <img src="<?php bloginfo('template_directory'); ?>/img/cg-main-image.jpg">
                        <h1>Bold. Unique. You.</h1>
                    </div>
                    <div class="bar">
                        <h2 class="title">Design your beautiful dining room</h2>
                        <a href="<?php bloginfo('url'); ?>/furniture-options/" class="button">
                            <span>start customizing</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="box">
                    <div class="image">
                        <img src="<?php bloginfo('template_directory'); ?>/img/cg-bedroom.jpg">
                    </div>
                    <div class="bar">
                        <h2 class="title">Bedrooms</h2>
                        <a href="<?php bloginfo('url'); ?>/catalog/bedroom" class="button">
                            <span>view</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="box">
                    <div class="image">
                        <img src="<?php bloginfo('template_directory'); ?>/img/cg-living.jpg">
                    </div>
                    <div class="bar">
                        <h2 class="title">Home &amp; Office</h2>
                        <a href="<?php bloginfo('url'); ?>/catalog/home-and-office" class="button">
                            <span>view</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="box">
                    <div class="image">
                        <img src="<?php bloginfo('template_directory'); ?>/img/cg-about.jpg">
                    </div>
                    <div class="bar">
                        <h2 class="title">Who We Are</h2>
                        <a href="<?php bloginfo('url'); ?>/about" class="button">
                            <span>view</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</section>
<?php get_footer(); ?>