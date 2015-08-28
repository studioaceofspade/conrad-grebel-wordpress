<div class="col-md-<?php echo $column_size; ?>">
    <div 
        class="box<?php if($counter == 0) { echo ' selected'; } ?>" 
        data-option-id="<?php echo $post->post_name; ?>"
        data-option-type="single-pedestal-base">
        <div class="image">
            <div class="select">
                <div class="vct">
                    <div class="vctr">
                        <div class="vctd">
                            <i class="fa fa-check-circle-o"></i>
                        </div>
                    </div>
                </div>
            </div>
            <img src="<?php the_field('thumbnail'); ?>">
        </div>
        <div class="bar">
            <h2 class="title"><?php the_title(); ?></h2>
        </div>
    </div>
    <div class="option-settings">
        
        <!-- SECTION: Step Data ===================================== 
             ======================================================== -->
        <?php if(get_field('does_this_skip_steps')) : ?>
        
        <?php 
            $skips = get_field('steps_to_skip');
            $skip_string = '';
            foreach($skips as $skip) :
                $skip_string .= $skip->post_name.',';
            endforeach;
            
            $skip_string = rtrim($skip_string, ',');
        ?>
        
        <div class="skips" data-steps="<?php echo $skip_string; ?>"></div>
        <?php endif; ?>
        
        
        <!-- SECTION: Pricing data ===================================== 
             =========================================================== -->
        <div class="single-ped-pricing" 
             data-model="<?php the_field('model_number'); ?>"
             data-cherry="<?php the_field('price-cherry'); ?>" 
             data-oak="<?php the_field('price-oak'); ?>"></div>

        
        <!-- SECTION: Single Ped Pricing Size ========================== 
             =========================================================== -->
        <?php while(have_rows('sizes_available')) : the_row(); ?>
        
        <div 
            class="size-available"
            data-size-available="<?php the_sub_field('size'); ?>"
            data-leaves-available="<?php the_sub_field('leaves_available'); ?>"
            data-price-addition="<?php the_sub_field('price_addition'); ?>">
        </div>
        
        <?php endwhile; ?>
    
        <!-- SECTION: Render data ====================================== 
             =========================================================== -->        
        <?php if(get_field('base')) : 
        
            $render = get_field('base');
            $render = array_pop($render);
            $render_image   = get_field('image_url', $render->ID);
            $masks   = '';            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $masks .= $mask_url['mask_url'].',';
            endforeach;
            
            $masks = rtrim($masks,',');
        ?>
        
        <div class="base-render"
             data-render="<?php echo $render_image; ?>"
             data-masks="<?php echo $masks; ?>"></div>
        
        <?php endif; ?>
        
        
    </div>
</div>