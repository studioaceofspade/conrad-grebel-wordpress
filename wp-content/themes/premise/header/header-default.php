<?php if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); } if (CFCT_DEBUG) { cfct_banner(__FILE__); } ?>
<!DOCTYPE html>

<!--

Authors: Studio Ace of Spade
Website: http://studioaceofspade.com
E-Mail: jon@studioaceofspade.com
 
-->

<head>
  <!-- Page Meta -->
  <meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
  <title><?php wp_title( '-', true, 'right' ); echo esc_html( get_bloginfo('name'), 1 ); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- CSS declarations -->
  <link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo('stylesheet_url') ?>" />
  <link rel="stylesheet" type="text/css" media="print" href="<?php bloginfo('template_directory'); ?>/css/print.css" />
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700|Roboto+Condensed:400,300,700' rel='stylesheet' type='text/css'>
  <!-- Bring IE7+ into modern times -->
  <!--[if lt IE 9]>
  <script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
  <![endif]-->
  <?php wp_head(); ?>
</head>

<body id="top-of-page">

<div class="ajax-url" data-ajax-url="<?php echo admin_url( 'admin-ajax.php' ); ?>" data-site-url="<?php bloginfo('url'); ?>"></div>

<?php if(!is_user_logged_in() && !isset($_COOKIE['cgStandardUser'])) : ?>
<div class="not-logged-in">

    <div class="vct">
        <div class="vctr">
            <div class="vctd">
                
                <div class="login-box">
                    <h1>Welcome to the Conrad Grebel Furniture Customizer!</h1>
                    <div class="row">
                        <div class="col-md-6">
                            <h2>Retailer Login</h2>
                            <p>Please contact a sales representative in your store for the username and password. Also, remember to check the remember me box in order to reduce the number of times required to login.</p>
                            <?php 
                            $args = array(
                                'redirect'  => get_bloginfo('url'),
                            );
                            wp_login_form($args); 
                            ?>
                        </div>
                        <div class="col-md-6">
                            <h2>I'm not a retailer!</h2>
                            <p>That's perfectly fine. Simply click the button below!</p>
                            <p>
                                <a href="<?php bloginfo('url'); ?>" class="no-pricing">Start customizing!</a>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</div>
<?php else: ?>

<?php
    $userid = 'user_'.get_current_user_id();
    
    $price_mod  = get_field('markup', $userid);
    $freight    = get_field('freight_modifier', $userid);
    $rounding   = get_field('price_rounding_rule', $userid);
    $membership = get_field('membership_level', $userid);
    
    $printEmail = get_field('print_email', $userid);
    
    $emails = '';
    if(have_rows('email_addresses', $userid)) : 
        while(have_rows('email_addresses', $userid)) : the_row();
            $emails .= get_sub_field('email_address').',';
        endwhile;
    endif;
    
    $emails = rtrim($emails, ',');
        
 ?>

<div 
    class="retailer-meta" 
    data-price-mod="<?php echo $price_mod; ?>" 
    data-email-users="<?php echo $emails; ?>"
    data-freight-mod="<?php echo $freight; ?>"
    data-rounding-rule="<?php echo $rounding; ?>"
    data-membership-level="<?php echo $membership; ?>"
    data-print-email="<?php echo $printEmail; ?>">
</div>
<?php endif; ?>

<div class="retailer-meta" data-price-mod="100" data-email-users="jon@studioaceofspade.com"></div>
<div class="remodal-bg">

<div class="container header-container">
    <div class="row">
        <div class="col-md-12">
            <header id="header" class="cf">
                <div class="menu transition">
                    <i class="fa fa-bars"></i>
                </div> 
                <nav id="main-nav">
                    <ul>
                        <li>
                            <a href="<?php bloginfo('url'); ?>/furniture-options">
                                <span class="nav-text">Customize your dining room furniture</span>
                                <span class="nav-icon"><i class="fa fa-arrow-circle-o-right"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php bloginfo('url'); ?>/catalog/bedroom">
                                <span class="nav-text">View Bedroom Catalog</span>
                                <span class="nav-icon"><i class="fa fa-arrow-circle-o-right"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php bloginfo('url'); ?>/catalog/office">
                                <span class="nav-text">View Home Office Catalog</span>
                                <span class="nav-icon"><i class="fa fa-arrow-circle-o-right"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php bloginfo('url'); ?>/catalog/living">
                                <span class="nav-text">View Living Catalog</span>
                                <span class="nav-icon"><i class="fa fa-arrow-circle-o-right"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php bloginfo('url'); ?>/about">
                                <span class="nav-text">Learn About Conrad Grebel</span>
                                <span class="nav-icon"><i class="fa fa-arrow-circle-o-right"></i></span>
                            </a>
                        </li>
                        <?php if(is_user_logged_in()) : ?>
                        <li>
                            <?php wp_loginout( get_bloginfo('url'), 'true' ); ?> 
                        </li>
                        <?php endif; ?>
                        <?php if(isset($_COOKIE['cgStandardUser'])) : ?>
                        <li>
                            <a href="#" class="destroy-cookie">Log out</a>
                        </li>
                        <?php endif; ?>
                    </ul>
                </nav>
                <a href="<?php bloginfo('url'); ?>" class="branding">
                    <img src="<?php bloginfo('template_directory'); ?>/img/branding.jpg" alt="Conrad Grebel">
                </a>
                <a class="collections" href="<?php bloginfo('url'); ?>/collections/">
                    <i class="fa fa-th-large"></i><span>view your collections</span>
                </a>
            </header>
        </div>
    </div>
</div>