<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

get_header(); ?>

<section id="catalog-item">

    <div class="container">
        <div class="row">
			<div class="col-md-12">
				<div class="box">
					<div class="bar">
						<h2 class="title"><?php the_title(); ?></h2>
						<a href="javascript: history.go(-1)" title="Go Back" class="button">
							<span>back</span>
							<i class="fa fa-chevron-right"></i>
						</a>
					</div>
				</div>
			</div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <div class="box catalog-images">
					<h2>Pieces in this collection</h2>
                    <div id="slideshow-pager">
                        <a href="#" class="cycle-prev pager-button"><i class="fa fa-chevron-circle-left"></i></a>
                        <a href="#" class="cycle-next pager-button"><i class="fa fa-chevron-circle-right"></i></a>
                        <div id="cycle-2" class="cycle-slideshow"
                            data-cycle-slides="> div"
                            data-cycle-timeout="0"
                            data-cycle-prev=".cycle-prev"
                            data-cycle-next=".cycle-next"
                            data-cycle-fx="carousel"
                            data-cycle-carousel-visible="5"
                            data-cycle-carousel-fluid=true
							data-cycle-caption="#slideshow-main .custom-caption"
							data-cycle-caption-template="Image {{slideNum}} of {{slideCount}}">
                            <?php 
                            if(have_rows('images')) : while(have_rows('images')): the_row();
                                $image = get_sub_field('main_image');
                                $size = "thumbnail";
                                if($image) :
                                    echo "<div>" . wp_get_attachment_image($image, $size) . "</div>";
                                endif;
                            endwhile; endif;
                            ?>
                        </div>
                    </div>
					<div id="slideshow-main">
                        <a href="#" class="cycle-prev pager-button"><i class="fa fa-chevron-circle-left"></i></a>
                        <a href="#" class="cycle-next pager-button"><i class="fa fa-chevron-circle-right"></i></a>
						<div id="cycle-1" class="cycle-slideshow"
							data-cycle-slides="> div"
							data-cycle-timeout="0"
							data-cycle-fx="carousel"
                            data-cycle-carousel-visible="1"
                            data-cycle-carousel-fluid=true>
                            <?php 
                            if(have_rows('images')) : while(have_rows('images')): the_row();
                                $image = get_sub_field('main_image');
                                $size = "medium";
                                if($image) :
                                    echo "<div>" . wp_get_attachment_image($image, $size) . "</div>";
                                endif;
                            endwhile; endif;
                            ?>
						</div>
						<p class="custom-caption"></p>
					</div>
					
					<script>
					jQuery(document).ready(function($){

					var slideshows = $('.cycle-slideshow').on('cycle-next cycle-prev', function(e, opts) {
						// advance the other slideshow
						slideshows.not(this).cycle('goto', opts.currSlide);
					});

					$('#cycle-2 .cycle-slide').click(function(){
						var index = $('#cycle-2').data('cycle.API').getSlideIndex(this);
						slideshows.cycle('goto', index);
					});

					});
					</script>
					
                </div>
			</div><!-- /col-md-7 -->
			<div class="col-md-5">
				<div class="catalog-about">
					<h2>About this collection</h2>
					<?php if(have_rows('sidebar_section')) : while(have_rows('sidebar_section')) : the_row(); ?>
						<h3><?php the_sub_field('section_title'); ?></h3>
						<ul>
							<?php if(have_rows('section_bullet_point')) : while(have_rows('section_bullet_point')) : the_row(); ?>
							<li><?php the_sub_field('bullet'); ?></li>
							<?php endwhile; endif; ?>
						</ul>
					<?php endwhile; endif; ?>
				</div>
			</div>
        </div>
    </div>

</section>

<?php get_footer(); ?>