<?php
if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }
if (CFCT_DEBUG) { cfct_banner(__FILE__); }

get_header(); ?>

<section id="collections">

    <div class="site-meta" data-site-url="<?php bloginfo('url'); ?>"></div>

    <div class="container collections-container">
        
        <div class="row">
            <div class="col-md-12">
                <div class="step-header">
                    <h2><?php the_title(); ?></h2>
                    <div class="price">
                        <i class="fa fa-tag"></i>
                        <span>$</span>
                        <span class="total"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row about-collections">
            <div class="col-md-12">
                <div class="content-wrapper">
                    <p>You're currently on the collections page. This is where all of your personally customized furniture appears. At this point, you can:</p>
                    <ol>
                        <li>Add more furniture using the buttons at the bottom of this page.</li>
                        <li>Finalize your customizations</li>
                    </ol>
                    <p>By finalizing your customizations, we will email you everything you've made so far. We will also email it to our specialized sales staff to assist you in finishing your purchase. By the way, as all good companies should do, we <strong>never use your email for marketing purposes.</strong></p>
                    <p>Our staff will inspect your build to ensure that it is perfect in every way possible, answer any of your questions, and assist you in any changes you may need to it beyond what is offered within this application.</p>
                </div>
            </div>
        </div>
        
        <div class="mail-button row">
            <div class="col-md-8 col-md-offset-2">
                <a class="button send-mail" href="#send-message">Finalize your collection</a>
            </div>
        </div>
        
        <div class="row collection-arena">
        </div>
    
        <div class="row add-some">
            <div class="col-md-12">
                <div class="content-wrapper">
                    <h2>Oops. Looks like you don't anything created yet!</h2>
                    <p>It seems that you haven't customized any furniture yet. This is the page where all of your customized furniture will appear once you've made it. Why don't you head on over to the customizer and get started?</p>
                </div>
            </div>
        </div>    
        
        <div class="add-more row">
            <div class="col-md-12" data-hide-when="chairs">
                <a href="<?php bloginfo('url'); ?>/furniture/chair" class="button">Add Chairs</a>
            </div>
            <div class="col-md-6" data-hide-when="tables">
                <a href="<?php bloginfo('url'); ?>/furniture/leg-table/" class="button">Add a Leg Table</a>
            </div>
            <div class="col-md-6" data-hide-when="tables">
                <a href="<?php bloginfo('url'); ?>/furniture/single-pedestal-table" class="button">Add a Single Pedestal Table</a>
            </div>
            <div class="col-md-6" data-hide-when="tables">
                <a href="<?php bloginfo('url'); ?>/furniture/double-pedestal-table/" class="button">Add a Double Pedestal Table</a>
            </div>
            <div class="col-md-6" data-hide-when="tables">
                <a href="<?php bloginfo('url'); ?>/furniture/trestle-table" class="button">Add a Trestle Table</a>
            </div>            
        </div>
        
        <div class="row admin-email">
            <div class="col-md-12">
                <div class="email-wrapper">

                    <h2 class="prepared-for-wrapper">Quote Prepared for: <span class="prepared-for"></span></h2>
                    <h2 class="contact-email-wrapper">Contact email addresses: <span class="contact-email"></span></h2>
                    <div class="admin-furniture-objects"></div>
                    
                </div>
            </div>
        </div>
        
        
        <div class="row user-email">
            <div class="col-md-12">
                <div class="email-wrapper">

                    <h1>Thanks for building furniture!</h1>
                    <h2>Please contact the retailer to finalize your order!</h2>
                    <div class="user-furniture-objects"></div>
                    
                </div>
            </div>
        </div>
        
    </div>
    
    <div class="print-price">
        <hr>
        <h3>Total Cost: <span class="total-print-cost"></span></h1>
        <div class="print-line-price">
            <ul>
            </ul>
        </div>
    </div>
    

    <div class="remodal sender" data-remodal-id="send-message">
        <h1>Finalize your Collection</h1>
        <p>By finalizing your customizations, we will email you everything you've made so far. We will also email it to our specialized sales staff to assist you in finishing your purchase. By the way, as all good companies should do, we <strong>never use your email for marketing purposes.</p>
        <div class="error">
            <p>Please check your email address for correctness and send again. If it does not work, find a sales representative to assist you.</p>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="field-wrapper">
                    <label>User Name</label>
                    <input id="user-name" type="text" placeholder="Your Name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="field-wrapper">
                    <label>User Email</label>
                    <input id="user-email" type="text" placeholder="your@email.com">
                </div>
            </div>
            <div class="col-md-6">
                <div class="field-wrapper">
                    <label>Salesperson Name</label>
                    <input id="sales-name" type="text" placeholder="Salesperson Name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="field-wrapper">
                    <label>Salesperson Email</label>
                    <input id="sales-email" type="text" placeholder="sales@person.com">
                </div>
            </div>
        </div>
        <input id="send-final-email" type="submit" value="Finalize and Email">
        <?php 
        $userid = 'user_'.get_current_user_id();
        $printEmail = get_field('print_email', $userid);
        if($printEmail) : ?>
        <input id="print" type="submit" value="Print">
        <?php else: ?>
        <input id="normal-print" type="submit" value="Print">
        <?php endif; ?>
    </div>

</section>

<?php get_footer(); ?>