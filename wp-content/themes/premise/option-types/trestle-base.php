<div class="col-md-<?php echo $column_size; ?>">
    <div 
        class="box<?php if($counter == 0) { echo ' selected'; } ?>" 
        data-option-id="<?php echo $post->post_name; ?>"
        data-option-type="tabletop">
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
            <img src="<?php the_field('photo'); ?>">
        </div>
        <div class="bar">
            <h2 class="title"><?php the_title(); ?></h2>
        </div>
    </div>
    <div class="option-settings">
    
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
        <div class="double-ped-pricing"
             data-model="<?php the_field('model_number'); ?>"
             data-cherry="<?php the_field('price_cherry_qswo'); ?>"
             data-oak="<?php the_field('price_oak_maple'); ?>"
        ></div>
        
        <!-- SECTION: Render data ====================================== 
             =========================================================== -->
        <?php
        if(have_rows('top_renders')) :
        while(have_rows('top_renders')) : the_row(); 
        
            $edge = get_sub_field('edge');
            $edge = array_pop($edge);
            $edge = $edge->post_name;
        
            $render = get_sub_field('render');
            $render = array_pop($render);
            
            $render_image = get_field('image_url', $render->ID);
            $render_masks = '';
            
            foreach(get_field('masks', $render->ID) as $mask_url) : 
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            
            $render_masks = rtrim($render_masks,',');
        ?>
        <div class="top-render"
            data-edge="<?php echo $edge; ?>"
            data-render="<?php echo $render_image; ?>"
            data-masks="<?php echo $render_masks; ?>"
        ></div>
        <?php endwhile; endif;?>
        
        <?php 
        if(get_field('base_render')) :
            $render = get_field('base_render');
            $render = array_pop($render);
            
            $render_image = get_field('image_url', $render->ID);
            $render_masks = '';
            
            
            
            foreach(get_field('masks', $render->ID) as $mask_url) : 
                $render_masks .= $mask_url['mask_url'].',';
            endforeach;
            
            $render_masks = rtrim($render_masks,',');
        ?>
        <div class="base-render"
            data-render="<?php echo $render_image; ?>"
            data-masks="<?php echo $render_masks; ?>"
        ></div>
        <?php endif; ?>
        
        <!-- SECTION: Measurement data ================================= 
             =========================================================== -->
        <?php
            $sizing = '';
            if(have_rows('widths')) : 
                while(have_rows('widths')) : the_row();
                    $sizing .= get_sub_field('width').',';
                endwhile;
                $sizing = rtrim($sizing,',');
            endif;
        ?>
        <div class="widths" data-widths="<?php echo $sizing; ?>"></div>
        <?php
            $sizing = '';
            if(have_rows('lengths')) :             
                while(have_rows('lengths')) : the_row();
                    $sizing .= get_sub_field('length').',';
                endwhile;
                $sizing = rtrim($sizing,',');
            endif;
        ?>
        <div class="lengths" data-lengths="<?php echo $sizing; ?>"></div>
        <div class="max-leaves" data-leaves="<?php the_field('leaves'); ?>"></div>
        <div class="leaf-size" data-leaf-size="<?php the_field('leaf_size'); ?>"></div>
        
    </div>
</div>