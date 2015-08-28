<div class="col-md-4">
    <div 
        class="box-measurement" 
        data-option-id="<?php echo $post->post_name; ?>">
        
        <div class="measurement-controls leaf-control" data-default="<?php the_field('default_size'); ?>" data-minimum="<?php the_field('minimum'); ?>" data-maximum="<?php the_field('maximum'); ?>">
            <div class="row">
                <div class="col-md-4 increase-decrease">
                    <div class="increase">
                        <i 
                            data-table-action="table-increase" 
                            data-table-target="leaves"
                            class="fa fa-chevron-up"></i>
                    </div>
                    <div class="decrease">
                        <i 
                            data-table-action="increase"
                            data-table-target="leaves"
                            class="fa fa-chevron-down"></i>
                    </div>
                </div>
                <div class="col-md-8">
                    <span class="count"><?php the_field('default_size'); ?></span>
                </div>
            </div>
        </div>
        
        <div class="bar">
            <h2 class="title">Number of leaves</h2>
        </div>
    </div>
</div>