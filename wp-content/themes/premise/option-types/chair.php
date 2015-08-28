<div class="col-md-<?php echo $column_size; ?>">
    <div 
        class="box<?php if($counter == 0) { echo ' selected'; } ?>" 
        data-option-id="<?php echo $post->post_name; ?>">
        <div class="image add-padding">

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
        
        <!-- SECTION: Chair Render Data ============================= 
             ======================================================== -->
             
        <!-- Base Render -->
        <?php
        if(get_field('base_render')) :         
            $render         = array_pop(get_field('base_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="base-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Seat Render -->
        <?php
        if(get_field('wooden_seat_render')) :         
            $render         = array_pop(get_field('wooden_seat_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wooden-seat-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Cushion Render -->
        <?php
        if(get_field('cushion_seat_render')) :         
            $render         = array_pop(get_field('cushion_seat_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="cushion-seat-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Front Arm Render -->
        <?php
        if(get_field('front_arm_render')) :         
            $render         = array_pop(get_field('front_arm_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="front-arm-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Back Arm Render -->
        <?php
        if(get_field('back_arm_render')) :         
            $render         = array_pop(get_field('back_arm_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="back-arm-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>

        <!-- Wide Base Render -->
        <?php
        if(get_field('wide_render')) :         
            $render         = array_pop(get_field('wide_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wide-base-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Wide Front Arm Render -->
        <?php
        if(get_field('wide_front_arm_render')) :         
            $render         = array_pop(get_field('wide_front_arm_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wide-front-arm-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Wide Back Arm Render -->
        <?php
        if(get_field('wide_back_arm_render')) :         
            $render         = array_pop(get_field('wide_back_arm_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wide-back-arm-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Wide Seat Render -->
        <?php
        if(get_field('wide_seat_render')) :         
            $render         = array_pop(get_field('wide_seat_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wide-seat-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- Wide Cushion Render -->
        <?php
        if(get_field('wide_cushion_render')) :         
            $render         = array_pop(get_field('wide_cushion_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="wide-cushion-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <!-- SECTION: Chair Pricing Data ============================ 
             ======================================================== -->
    
        <div 
            class="chair-pricing"
            data-model-number="<?php the_field('model_number'); ?>"
            data-oak-maple-no-arms="<?php the_field('price_oak_maple_no_arms'); ?>"
            data-cherry-qswo-no-arms="<?php the_field('price_cherry_qswo_no_arms'); ?>"
            data-oak-maple-arms="<?php the_field('price_oak_maple_arms'); ?>"
            data-cherry-qswo-arms="<?php the_field('price_cherry_qswo_arms'); ?>"
            data-leather-addon="<?php the_field('leather_price'); ?>"
            data-fabric-addon="<?php the_field('fabric_price'); ?>">
        </div>
    
    </div>
    
</div>