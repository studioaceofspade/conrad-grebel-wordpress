<div class="col-md-<?php echo $column_size; ?>">
    <div 
        class="box<?php if($counter == 0) { echo ' selected'; } ?>" 
        data-option-id="<?php echo $post->post_name; ?>">
        <div class="image">
            
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
            <img src="<?php the_field('server_image'); ?>">
        </div>
        <div class="bar">
            <h2 class="title"><?php the_title(); ?></h2>
        </div>
    </div>
    
    <div class="option-settings">
    
        <?php if(have_rows('hides')) : ?>
            <?php 
            while(have_rows('hides')) : the_row(); 
            $hide = get_sub_field('option_to_hide');            
            $h = array_pop($hide);
            ?>
        <div class="hide-option" data-hide="<?php echo $h->post_name; ?>"></div>
            <?php endwhile; ?>
        <?php endif; ?>
    
        <?php
        $id = $post->ID;
        $user = wp_get_current_user();
        $user_id = $user->ID;
        
        if($user_id == '17') {
            $user_id = 16;
        }
                
        if(have_rows('modify_retailer_price')) : 
            while(have_rows('modify_retailer_price')) : the_row();
                $mod_user = get_sub_field('retailer');
                
                if($user_id == $mod_user['ID']) :
                
                    echo '<div class="retailer-price-mod" data-mod-amount="'.get_sub_field('price_modification').'"></div>';
                
                endif;
            endwhile; 
        endif; ?>
        
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
        <div 
            class="server-pricing"
            data-base-price="<?php the_field('base_price'); ?>"
            data-premium-price="<?php the_field('premium_price'); ?>"
            data-model="<?php the_field('model'); ?>"
            data-drawers="<?php the_field('drawer_count'); ?>">
        </div>
        <?php if(get_field('does_this_have_a_hutch')) : ?>
        <div 
            class="hutch-pricing"
            data-base-price="<?php the_field('hutch_base_price'); ?>"
            data-premium-price="<?php the_field('hutch_premium_price'); ?>">
        </div>
        <?php endif; ?>
        
        <!-- SECTION: Server Render data ===============================
             =========================================================== -->
        <?php
        if(get_field('doordrawer_render')) :         
            $render         = array_pop(get_field('doordrawer_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="door-drawer-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
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
        
        <?php
        if(get_field('default_hardware')) :         
            $default        = array_pop(get_field('default_hardware'));
            $default_name   = $default->post_name;
        ?>
        <div 
            class="default-hardware"
            data-default-hardware="<?php echo $default_name; ?>">
        </div>
        <?php endif; ?>        
        
        <?php if(have_rows('hardware_renders')) : ?>
        
            <?php while(have_rows('hardware_renders')) : the_row(); 
                $render         = array_pop(get_sub_field('render'));
                $render_image   = get_field('image_url', $render->ID);
                $render_masks   = '';
                
                foreach(get_field('masks', $render->ID) as $mask_url) :
                    $render_masks .= $mask_url['mask_url'].',';
                endforeach;
                $render_masks = rtrim($render_masks,',');
                
                $related_object = array_pop(get_sub_field('related_option'));
                $related_option = $related_object->post_name; ?>
        <div 
            class="hardware-render"
            data-related-option="<?php echo $related_option; ?>"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
            <?php endwhile; ?>
        <?php endif; ?>
        
        <?php
        if(get_field('hinge_render')) :         
            $render         = array_pop(get_field('hinge_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="hinge-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <?php
        if(get_field('glass_render')) :         
            $render         = array_pop(get_field('glass_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="hinge-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>"
            data-render-texture="<?php the_field('hinge_texture'); ?>">
        </div>
        <?php endif; ?>
        
        <!-- SECTION: Hutch Render data ===============================
             =========================================================== -->
        <?php if(get_field('does_this_have_a_hutch')) : ?>
        <?php
        if(get_field('hutch_doordrawer_render')) :         
            $render         = array_pop(get_field('hutch_doordrawer_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="hutch-doordrawer-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <?php
        if(get_field('hutch_base_render')) :         
            $render         = array_pop(get_field('hutch_base_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="hutch-base-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
        <?php endif; ?>
        
        <?php if(have_rows('hutch_hardware_renders')) : ?>
        
            <?php while(have_rows('hutch_hardware_renders')) : the_row(); 
                $render         = array_pop(get_sub_field('related_render'));
                $render_image   = get_field('image_url', $render->ID);
                $render_masks   = '';
                
                foreach(get_field('masks', $render->ID) as $mask_url) :
                    $render_masks .= $mask_url['mask_url'].',';
                endforeach;
                $render_masks = rtrim($render_masks,',');
                
                $related_object = array_pop(get_sub_field('related_option'));
                $related_option = $related_object->post_name; ?>
        <div 
            class="hutch-hardware-render"
            data-related-option="<?php echo $related_option; ?>"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
            <?php endwhile; ?>
        <?php endif; ?>
        
        <?php if(have_rows('hutch_glass_render')) : ?>
            <?php while(have_rows('hutch_glass_render')) : the_row(); 
                $render         = array_pop(get_sub_field('glass_render'));
                $render_image   = get_field('image_url', $render->ID);
                $render_masks   = '';
                
                foreach(get_field('masks', $render->ID) as $mask_url) :
                    $render_masks .= $mask_url['mask_url'].',';
                endforeach;
                $render_masks = rtrim($render_masks,',');
                
                $related_object = array_pop(get_sub_field('related_option'));
                $related_option = $related_object->post_name; ?>
        <div 
            class="hutch-glass-render"
            data-related-option="<?php echo $related_option; ?>"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>">
        </div>
            <?php endwhile; ?>
        <?php endif; ?>
        
        <?php
        if(get_field('hutch_hinge_render')) :         
            $render         = array_pop(get_field('hutch_hinge_render'));
            $render_image   = get_field('image_url', $render->ID);
            $render_masks   = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) :
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            $render_masks = rtrim($render_masks,',');
        ?>
        <div 
            class="hutch-hinge-render"
            data-render-image="<?php echo $render_image; ?>"
            data-render-masks="<?php echo $render_masks; ?>"
            data-render-texture="<?php the_field('hinge_texture'); ?>">
        </div>
        <?php endif; ?>
        
        <?php endif; ?>
    
    </div>
    
</div>