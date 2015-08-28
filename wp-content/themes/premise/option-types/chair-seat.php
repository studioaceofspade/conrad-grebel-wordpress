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
    
    </div>
    
</div>