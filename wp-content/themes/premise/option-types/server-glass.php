<div class="col-md-<?php echo $column_size; ?>">
    <div 
        class="box<?php if($counter == 0) { echo ' selected'; } ?>" 
        data-option-id="<?php echo $post->post_name; ?>">
        <div class="image">
            
            <?php if(get_field('does_this_modify_price')) : ?>
            <div class="price-increase">
                <i class="fa fa-dollar"></i>
            </div>
            <?php endif; ?>
            
            <?php if(get_field('notification')) : ?>
            <div class="notification-icon">
                <i class="fa fa-question"></i>
                <div data-remodal-id="modal-<?php echo $post->post_name; ?>">
                    <h1>Options Notes</h1>
                    <div class="notes">
                        <?php the_field('message'); ?>
                    </div>
                    <?php if(get_field('image')) : ?>
                    <img class="note-image" src="<?php the_field('image'); ?>">
                    <?php endif; ?>
                </div>
            </div>
            <?php endif; ?>
            
            <div class="select">
                <div class="vct">
                    <div class="vctr">
                        <div class="vctd">
                            <i class="fa fa-check-circle-o"></i>
                        </div>
                    </div>
                </div>
            </div>
            <img src="<?php the_field('photo'); ?>">
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
        <?php if(get_field('does_this_modify_price')) : ?>
        <?php if(get_field('price_mod_level') == 'type' || get_field('price_mod_level') == 'both' ) : ?>
            <?php while(have_rows('types_to_modify')) : the_row(); ?>
                <?php 
                $step = get_sub_field('step');
                foreach($step as $step_object) :
                    if($step_object->post_name == $typeID) : ?>
                <div 
                    class="step-pricing" 
                    data-price-type="<?php the_sub_field('price_change_type'); ?>"
                    data-flat-rate="<?php the_sub_field('flat_rate_amount'); ?>"
                    data-percentage="<?php the_sub_field('percentage_amount'); ?>">
                </div>
                <?php endif; 
                endforeach; ?>
            <?php endwhile; ?>
        <?php endif; ?>
        <?php if(get_field('price_mod_level') == 'option' || get_field('price_mod_level') == 'both') : ?>
            <?php while(have_rows('option_specific_pricing')) : the_row();
                $option = get_sub_field('related_option');
                $option_object = array_pop($option);
                ?>
                <div class="option-pricing"
                     data-related-option="<?php echo $option_object->post_name; ?>"
                     data-option-price-type="<?php the_sub_field('option_price_change_type'); ?>"
                     data-option-flat-rate="<?php the_sub_field('option_flat_rate_amount'); ?>"
                     data-option-percentage="<?php the_sub_field('option_percentage_amount'); ?>">
                
                </div>
            <?php endwhile; ?>
        
        <?php endif; ?>
        <?php endif; ?>
    
    </div>
    
</div>