<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

global $post;
$typeID = $post->post_name;

if(array_key_exists('edit-collection', $_GET)) :
    $edit = $_GET['edit-collection'];  
endif;

get_header(); ?>

<section id="furniture-type">


    <div class="container">
        <div class="render <?php echo $post->post_name; ?>">
            <img class="render-image" src="">
            <div class="pgloading">
                <div class="loadingwrap">
                    <ul class="bokeh">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div 
        id="<?php echo $post->post_name; ?>" 
        data-type-title="<?php echo $post->post_title; ?>"
        data-edit="<?php echo $edit; ?>"
        class="container furniture-container">
    
        <?php 
        $steps = get_field('steps');
        if($steps): 
        $c = 0;
        
        foreach($steps as $post) : setup_postdata($post); 
            $step_terms = get_the_terms($post->ID, 'step_types');
            
            $termString = '';
            if($step_terms) :
                foreach($step_terms as $terms) :
                    $termString .= $terms->slug;
                endforeach;
            endif;
        ?>
        
        <div 
            class="step <?php if($c == 0) { echo 'active'; } ?>"
            data-step-types="<?php echo $termString; ?>"
            data-step-id="<?php echo $post->post_name; ?>"
            data-display-price="<?php the_field('display_price'); ?>"
            data-display-first-price="<?php the_field('first_price'); ?>"
            data-display-render=<?php the_field('display_render'); ?>>
       
            <div class="row">
                <div class="col-md-12">
                    <div class="step-header">
                        <h2><?php the_title(); ?></h2>
                        <div class="price">
                            <i class="fa fa-tag"></i>
                            <span>$</span>
                            <span class="total">699.04</span>
                        </div>
                    </div>
                    <div class="matcher hide"></div>
                </div>
            </div>
            
            <?php if(get_field('notification')) : ?>
            <div class="row">
                <div class="col-md-12">
                    <div class="note-wrapper">
                        <h3>Notes about this step</h3>
                        <div class="note-content">
                            <?php the_field('notification'); ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            
        <?php if(!has_term('review', 'step_types')) : ?>
            <?php if(get_field('display_measurement')) : ?>
            
                <?php if(get_field('measurement_render') == 'chair') : ?>
                <div id="chair-count" class="row">
                    <div class="col-md-6 arm-quantity">
                        <div style="display: block !important;" class="render <?php echo $post->post_name; ?>">
                            <img class="render-image arms-render" src="">
                            <div class="pgloading">
                                <div class="loadingwrap">
                                    <ul class="bokeh">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 armless-quantity">
                        <div style="display: block !important;" class="render <?php echo $post->post_name; ?>">
                            <img class="render-image no-arms-render" src="">
                            <div class="pgloading">
                                <div class="loadingwrap">
                                    <ul class="bokeh">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php if(get_field('measurement_render') == 'leg') : ?>
                <div id="tabletop">
                    <div id="total-measurement">
                        <p>Your table length, including leaves, is <span class="length-measurement-calc">72</span>"</p>
                    </div>
                    <div class="vct">
                        <div class="vctr">
                            <div class="vctd">
                                
                                <div id="top-render">
                                
                                    <div id="top-chairs"></div>
                                    <div id="right-chairs"></div>
                                    <div id="bottom-chairs"></div>
                                    <div id="left-chairs"></div>
                                    
                                    <div id="leaves"></div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php if(get_field('measurement_render') == 'double_ped') : ?>
                <div id="tabletop">
                    <div id="total-measurement">
                        <p>Your table length, including leaves, is <span class="length-measurement-calc">72</span>"</p>
                    </div>
                    <div class="vct">
                        <div class="vctr">
                            <div class="vctd">
                                
                                <div id="top-render">
                                
                                    <div id="top-chairs"></div>
                                    <div id="right-chairs"></div>
                                    <div id="bottom-chairs"></div>
                                    <div id="left-chairs"></div>
                                    
                                    <div id="leaves"></div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php if(get_field('measurement_render') == 'single_ped') : ?>
                <div id="tabletop">
                    <div id="total-measurement">
                        <p>Your table length, including leaves, is <span class="length-measurement-calc">72</span>"</p>
                    </div>
                    <div class="vct">
                        <div class="vctr">
                            <div class="vctd">
                                <div id="single-top">
                                    <div id="single-leaves"></div>
                                    <div id="single-chairs"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php if(get_field('measurement_render') == 'trestle') : ?>
                <div id="tabletop">
                    <div class="vct">
                        <div class="vctr">
                            <div class="vctd">
                                
                                <div id="top-render">
                                
                                    <div id="top-chairs"></div>
                                    <div id="right-chairs"></div>
                                    <div id="bottom-chairs"></div>
                                    <div id="left-chairs"></div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            
            <?php endif; ?>
            <div class="row options">
                <?php
                $column_size = get_field('default_column_size'); 
                $options = get_field('options');
                $counter = 0;
                foreach($options as $post) : ?>
                
                <?php if(has_term('wood-choice','option_type')) : ?>
                    <?php include(locate_template('option-types/wood-choice.php')); ?>
                    
                <?php elseif(has_term('leg-base','option_type')) : ?>
                    <?php include(locate_template('option-types/leg-base.php')); ?>
                    
                <?php elseif(has_term('leg-top','option_type')) : ?>
                    <?php include(locate_template('option-types/leg-top.php')); ?>
                    
                <?php elseif(has_term('apron','option_type')) : ?>
                    <?php include(locate_template('option-types/apron.php')); ?>
                    
                <?php elseif(has_term('edge-profile','option_type')) : ?>
                    <?php include(locate_template('option-types/edge-profile.php')); ?>
                    
                <?php elseif(has_term('thickness','option_type')) : ?>
                    <?php include(locate_template('option-types/thickness.php')); ?>
                      
                <?php elseif(has_term('leg-width','option_type')) : ?>
                    <?php include(locate_template('option-types/leg-width.php')); ?>
                
                <?php elseif(has_term('leg-length','option_type')) : ?>
                    <?php include(locate_template('option-types/leg-length.php')); ?>
                    
                <?php elseif(has_term('leg-leaves','option_type')) : ?>
                    <?php include(locate_template('option-types/leg-leaves.php')); ?>
                    
                <?php elseif(has_term('wood-color','option_type')) : ?>
                    <?php include(locate_template('option-types/wood-color.php')); ?>
                    
                <?php elseif(has_term('single-pedestal-base','option_type')) : ?>
                    <?php include(locate_template('option-types/single-pedestal-base.php')); ?>
                    
                <?php elseif(has_term('single-pedestal-diameter','option_type')) : ?>
                    <?php include(locate_template('option-types/single-pedestal-diameter.php')); ?>
                    
                <?php elseif(has_term('single-pedestal-leaves','option_type')) : ?>
                    <?php include(locate_template('option-types/single-pedestal-leaves.php')); ?>
                    
                <?php elseif(has_term('chair','option_type')) : ?>
                    <?php include(locate_template('option-types/chair.php')); ?> 
                    
                <?php elseif(has_term('chair-seat','option_type')) : ?>
                    <?php include(locate_template('option-types/chair-seat.php')); ?>   
                    
                <?php elseif(has_term('fabric','option_type')) : ?>
                    <?php include(locate_template('option-types/fabric.php')); ?>   
                
                <?php elseif(has_term('leather','option_type')) : ?>
                    <?php include(locate_template('option-types/leather.php')); ?>                    
                    
                <?php elseif(has_term('arm-quantity','option_type')) : ?>
                    <?php include(locate_template('option-types/arm-quantity.php')); ?>  
                    
                <?php elseif(has_term('no-arm-quantity','option_type')) : ?>
                    <?php include(locate_template('option-types/armless-quantity.php')); ?>  
                    
                <?php elseif(has_term('distressing','option_type')) : ?>
                    <?php include(locate_template('option-types/distressing.php')); ?> 
                    
                <?php elseif(has_term('rub-through','option_type')) : ?>
                    <?php include(locate_template('option-types/rub-through.php')); ?> 
                    
                <?php elseif(has_term('double-pedestal-base','option_type')) : ?>
                    <?php include(locate_template('option-types/double-pedestal-base.php')); ?> 
                    
                <?php elseif(has_term('double-pedestal-width','option_type')) : ?>
                    <?php include(locate_template('option-types/double-pedestal-width.php')); ?>
                
                <?php elseif(has_term('double-pedestal-length','option_type')) : ?>
                    <?php include(locate_template('option-types/double-pedestal-length.php')); ?>
                
                <?php elseif(has_term('double-pedestal-leaves','option_type')) : ?>
                    <?php include(locate_template('option-types/double-pedestal-leaves.php')); ?>
                    
                <?php elseif(has_term('trestle-width','option_type')) : ?>
                    <?php include(locate_template('option-types/trestle-width.php')); ?>
                    
                <?php elseif(has_term('trestle-length','option_type')) : ?>
                    <?php include(locate_template('option-types/trestle-length.php')); ?>
                    
                <?php elseif(has_term('trestle-width','option_type')) : ?>
                    <?php include(locate_template('option-types/trestle-width.php')); ?>
                    
                <?php elseif(has_term('trestle-base','option_type')) : ?>
                    <?php include(locate_template('option-types/trestle-base.php')); ?>
                    
                    
                <?php endif; ?>

                <?php $counter++; endforeach; wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <?php if($post->post_name == 'chair-review'): ?>
            
            <!-- Review Setup -->
            <div class="row review">
                <div class="col-md-12">
                    <div class="review-wrapper">
                        <h2>Review Your Choices</h2>
                        <table class="review-table">
                            <thead>
                                <tr>
                                    <th>Option name</th>
                                    <th>Your Choice</th>
                                    <th>Cost of Addon</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Furniture Type</td>
                                    <td>Chair</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Chair Style</td>
                                    <td class="chair-style"></td>
                                    <td class="chair-style-cost"></td>
                                    <td class="chair-style-edit"></td>
                                </tr>
                                <tr class="arm-row">
                                    <td>Arm Chairs, Model <span class="chair-model"></span>AC</td>
                                    <td class="chair-arm-quantity"></td>
                                    <td class="chair-arm-cost"></td>
                                    <td class="chair-arm-edit"></td>
                                </tr>
                                <tr>
                                    <td>Side Chairs, Model <span class="chair-model"></span>SC</td>
                                    <td class="chair-no-arm-quantity"></td>
                                    <td>&nbsp</td>
                                    <td class="chair-no-arm-edit"></td>
                                </tr>
                                <tr>
                                    <td>Seat Type</td>
                                    <td class="chair-seat-type"></td>
                                    <td>&nbsp;</td>
                                    <td class="chair-seat-type-edit"></td>
                                </tr>
                                <tr>
                                    <td>Chair Wood Type</td>
                                    <td class="chair-wood-type"></td>
                                    <td class="chair-wood-type-cost"></td>
                                    <td class="chair-wood-type-edit"></td>
                                </tr>
                                <tr>
                                    <td>Chair Base Color</td>
                                    <td class="chair-base-color"></td>
                                    <td class="chair-base-color-cost">&nbsp;</td>
                                    <td class="chair-base-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Chair Seat Color/Fabric/Leather</td>
                                    <td class="chair-seat-color"></td>
                                    <td class="chair-seat-color-cost">&nbsp;</td>
                                    <td class="chair-seat-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Chair Distressing</td>
                                    <td class="chair-distressing"></td>
                                    <td class="chair-distressing-cost">&nbsp;</td>
                                    <td class="chair-distressing-edit"></td>
                                </tr>
                                <tr>
                                    <td>Chair Rub Through</td>
                                    <td class="chair-rub"></td>
                                    <td class="chair-rub-cost">&nbsp;</td>
                                    <td class="chair-rub-edit"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <?php elseif($post->post_name == 'double-pedestal-review'): ?>
            
            <!-- Review Setup -->
            <div class="row review">
                <div class="col-md-12">
                    <div class="review-wrapper">
                        <h2>Review Your Choices</h2>
                        <table class="review-table">
                            <thead>
                                <tr>
                                    <th>Option name</th>
                                    <th>Your Choice</th>
                                    <th>Cost of Addon</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Furniture Type</td>
                                    <td>Double Pedestal</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Table Style</td>
                                    <td class="dp-table-style"></td>
                                    <td class="dp-table-style-cost"></td>
                                    <td class="dp-table-style-edit"></td>
                                </tr>
                                <tr>
                                    <td>Model Number</td>
                                    <td class="dp-table-model">Top: <span class="model"></span>T, Base: <span class="model"></span>B</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Wood Type</td>
                                    <td class="dp-wood-type"></td>
                                    <td class="dp-wood-type-cost">&nbsp;</td>
                                    <td class="dp-wood-type-edit"></td>
                                </tr>
                                <tr>
                                    <td>Edge Profile</td>
                                    <td class="dp-edge-profile"></td>
                                    <td>&nbsp;</td>
                                    <td class="dp-edge-profile-edit"></td>
                                </tr>
                                <tr>
                                    <td>Dimensions</td>
                                    <td class="dp-dimensions"></td>
                                    <td class="dp-dimensions-cost"></td>
                                    <td class="dp-dimensions-edit"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="dp-dimensions-leaves"></td>
                                    <td class="dp-dimensions-leaves-cost"></td>
                                    <td class="dp-dimensions-leaves-edit"></td>
                                </tr>
                                <tr>
                                    <td>Number of Leaves</td>
                                    <td class="dp-leaves"></td>
                                    <td class="dp-leaves-cost"></td>
                                    <td class="dp-leaves-edit"></td>
                                </tr>
                                <tr>
                                    <td>Base Color</td>
                                    <td class="dp-base-color"></td>
                                    <td class="dp-base-color-cost"></td>
                                    <td class="dp-base-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Top Color</td>
                                    <td class="dp-top-color"></td>
                                    <td class="dp-top-color-cost">&nbsp;</td>
                                    <td class="dp-top-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Distressing</td>
                                    <td class="dp-distressing"></td>
                                    <td class="dp-distressing-cost"></td>
                                    <td class="dp-distressing-edit"></td>
                                </tr>
                                <tr>
                                    <td>Rub Through</td>
                                    <td class="dp-rub"></td>
                                    <td class="dp-rub-cost">&nbsp;</td>
                                    <td class="dp-rub-edit"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <?php elseif($post->post_name == 'trestle-table-review') : ?>
            <div class="row review">
                <div class="col-md-12">
                    <div class="review-wrapper">
                        <h2>Review Your Choices</h2>
                        <table class="review-table">
                            <thead>
                                <tr>
                                    <th>Option name</th>
                                    <th>Your Choice</th>
                                    <th>Cost of Addon</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Furniture Type</td>
                                    <td>Trestle Table</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Table Style</td>
                                    <td class="dp-table-style"></td>
                                    <td class="dp-table-style-cost"></td>
                                    <td class="dp-table-style-edit"></td>
                                </tr>
                                <tr>
                                    <td>Model Number</td>
                                    <td class="dp-table-model">Top: <span class="model"></span>T, Base: <span class="model"></span>B</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Wood Type</td>
                                    <td class="dp-wood-type"></td>
                                    <td class="dp-wood-type-cost">&nbsp;</td>
                                    <td class="dp-wood-type-edit"></td>
                                </tr>
                                <tr>
                                    <td>Edge Profile</td>
                                    <td class="dp-edge-profile"></td>
                                    <td>&nbsp;</td>
                                    <td class="dp-edge-profile-edit"></td>
                                </tr>
                                <tr>
                                    <td>Dimensions</td>
                                    <td class="dp-dimensions"></td>
                                    <td class="dp-dimensions-cost"></td>
                                    <td class="dp-dimensions-edit"></td>
                                </tr>
                                <tr>
                                    <td>Base Color</td>
                                    <td class="dp-base-color"></td>
                                    <td class="dp-base-color-cost"></td>
                                    <td class="dp-base-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Top Color</td>
                                    <td class="dp-top-color"></td>
                                    <td class="dp-top-color-cost">&nbsp;</td>
                                    <td class="dp-top-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Distressing</td>
                                    <td class="dp-distressing"></td>
                                    <td class="dp-distressing-cost"></td>
                                    <td class="dp-distressing-edit"></td>
                                </tr>
                                <tr>
                                    <td>Rub Through</td>
                                    <td class="dp-rub"></td>
                                    <td class="dp-rub-cost">&nbsp;</td>
                                    <td class="dp-rub-edit"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <?php elseif($post->post_name == 'single-pedestal-review') : ?>
            <div class="row review">
                <div class="col-md-12">
                    <div class="review-wrapper">
                        <h2>Review Your Choices</h2>
                        <table class="review-table">
                            <thead>
                                <tr>
                                    <th>Option name</th>
                                    <th>Your Choice</th>
                                    <th>Cost of Addon</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Furniture Type</td>
                                    <td>Trestle Table</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Table Style</td>
                                    <td class="dp-table-style"></td>
                                    <td class="dp-table-style-cost"></td>
                                    <td class="dp-table-style-edit"></td>
                                </tr>
                                <tr>
                                    <td>Model Number</td>
                                    <td class="dp-table-model">Top: <span class="model"></span>T, Base: <span class="model"></span>B</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Wood Type</td>
                                    <td class="dp-wood-type"></td>
                                    <td class="dp-wood-type-cost">&nbsp;</td>
                                    <td class="dp-wood-type-edit"></td>
                                </tr>
                                <tr>
                                    <td>Edge Profile</td>
                                    <td class="dp-edge-profile"></td>
                                    <td>&nbsp;</td>
                                    <td class="dp-edge-profile-edit"></td>
                                </tr>
                                <tr>
                                    <td>Dimensions</td>
                                    <td class="dp-dimensions"></td>
                                    <td class="dp-dimensions-cost"></td>
                                    <td class="dp-dimensions-edit"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="dp-dimensions-leaves"></td>
                                    <td class="dp-dimensions-leaves-cost"></td>
                                    <td class="dp-dimensions-leaves-edit"></td>
                                </tr>
                                <tr>
                                    <td>Leaves</td>
                                    <td class="dp-leaves"></td>
                                    <td class="dp-leaves-cost"></td>
                                    <td class="dp-leaves-edit"></td>
                                </tr>
                                <tr>
                                    <td>Base Color</td>
                                    <td class="dp-base-color"></td>
                                    <td class="dp-base-color-cost"></td>
                                    <td class="dp-base-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Top Color</td>
                                    <td class="dp-top-color"></td>
                                    <td class="dp-top-color-cost">&nbsp;</td>
                                    <td class="dp-top-color-edit"></td>
                                </tr>
                                <tr>
                                    <td>Distressing</td>
                                    <td class="dp-distressing"></td>
                                    <td class="dp-distressing-cost"></td>
                                    <td class="dp-distressing-edit"></td>
                                </tr>
                                <tr>
                                    <td>Rub Through</td>
                                    <td class="dp-rub"></td>
                                    <td class="dp-rub-cost">&nbsp;</td>
                                    <td class="dp-rub-edit"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <?php else: ?>
            <!-- Review Setup -->
            <div class="row review">
                <div class="col-md-12">
                    <div class="review-wrapper">
                        <h2>Review Your Choices</h2>
                        <table class="review-table">
                            <thead>
                                <tr>
                                    <th>Option name</th>
                                    <th>Your Choice</th>
                                    <th>Cost of Addon</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Furniture Type</td>
                                    <td>Leg Table</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                            <tbody class="dynamic">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <?php endif; ?>
        <?php endif; ?>
        </div>
        <?php $c++; endforeach; wp_reset_postdata(); ?>
        
        <?php endif; ?>
        
        <div class="step-footer">
            <a class="back" href="<?php bloginfo('url'); ?>/furniture-options">
                <i class="fa fa-chevron-left"></i>
                <span>back</span>
            </a>
            <a class="review-jump" href="#">
                <span>jump to review step</span>
            </a>
            <a class="next" href="<?php bloginfo('url'); ?>/collections">
                <span>next</span>
                <i class="fa fa-chevron-right"></i>
            </a>
        </div>
        
    </div>

</section>

<script>

collection = {};

$(document).ready(function() {
    loadCollection();
    restrictOptions();
});

function loadCollection() {   
    collection = JSON.parse(localStorage.getItem('builds'));
}

function restrictOptions() {
    
    hideChairs = false;
    hideTables = false;
    
    haveTable = false;
    haveChair = false;
    
    creatingTable = false;
    creatingChair = false;
    
    currentFurnitureType = $('.furniture-container').attr('id');
    
    if($('#'+currentFurnitureType).data('edit') === '') {       
        if(collection) {
            if(collection.length > 0) {            
                for(var n = 0; n < collection.length; n++) {
                    
                    // Determine if we have any tables
                    if( collection[n].furnitureType[0] == 'leg-table' ||
                        collection[n].furnitureType[0] == 'single-pedestal-table' ||
                        collection[n].furnitureType[0] == 'double-pedestal-table' ||
                        collection[n].furnitureType[0] == 'trestle-table') {
                            
                        haveTable = true;
                        
                    }
                    
                    // Determine if we have any chairs
                    if( collection[n].furnitureType[0] == 'chair') {
                        haveChair = true;
                    }
                    
                    // Determine if we are creating a table
                    if( currentFurnitureType == 'leg-table' ||
                        currentFurnitureType == 'single-pedestal-table' ||
                        currentFurnitureType == 'double-pedestal-table' ||
                        currentFurnitureType == 'trestle-table') {
                            
                        creatingTable = true;
                        
                    }
                    
                    // Determine if we are creating a chair
                    if(currentFurnitureType == 'chair') {
                        creatingChair = true;
                    }
                    
                    if(creatingChair && haveChair) {
                        hideChairs = true;
                    }
                    
                    if(creatingTable && haveTable) {
                        hideTables = true;
                    }
                    
                }
                
                if(hideChairs == true) {
                    alert('Sorry, but you have already built chairs. Please build another type of furniture, remove the chairs from your collection, or finalize your build on the collection screen.');
                    window.location.href = 'http://cg.saos.co/collections/';
                }
                
                if(hideTables == true) {
                    alert('Sorry, but you have already built a table. Please build another type of furniture, remove the table from your collection, or finalize your builds on the collection screen.');
                    window.location.href = 'http://cg.saos.co/collections/';
                }
            }
        }
    }
    
    
}
</script>

<?php get_footer(); ?>