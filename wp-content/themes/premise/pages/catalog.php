<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

get_header(); ?>

<section id="catalog">

    <div class="container">
        <div class="row">
			<div class="col-md-12">
				<div class="box">
					<div class="bar">
						<h2 class="title"><?php the_title(); ?> by Conrad Grebel</h2>
						<a href="<?php bloginfo('wpurl'); ?>/" title="Go Back" class="button">
							<span>back</span>
							<i class="fa fa-chevron-right"></i>
						</a>
					</div>
				</div>
			</div>
        </div>
		
		<div class="row options">
			<?php $posts = get_field('catalog_items'); ?>
			<?php foreach($posts as $p) : ?>
				<div class="col-md-4">
					<a href="<?php echo get_the_permalink($p->ID); ?>">
						<div class="box">
							<?php 
							$image = get_field('featured_image', $p->ID);
							$size = 'medium'; 
							$image_attributes = wp_get_attachment_image_src($image, $size); // returns an array
							?>
							<div class="image" style="background-image:url(<?php echo $image_attributes[0]; ?>);"> </div>
							<div class="bar">
								<h2 class="title"><?php echo get_the_title($p->ID); ?></h2>
							</div>
						</div>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
				
    </div>

</section>

<?php get_footer(); ?>