<?php

// This file is part of the Carrington JAM Theme for WordPress
// http://carringtontheme.com
//
// Copyright (c) 2008-2010 Crowd Favorite, Ltd. All rights reserved.
// http://crowdfavorite.com
//
// Released under the GPL license
// http://www.opensource.org/licenses/gpl-license.php
//
// **********************************************************************
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
// **********************************************************************

if (__FILE__ == $_SERVER['SCRIPT_FILENAME']) { die(); }

load_theme_textdomain('carrington-jam');

define('CFCT_DEBUG', false);
define('CFCT_PATH', trailingslashit(TEMPLATEPATH));

include_once(CFCT_PATH.'carrington-core/carrington.php');
include_once(CFCT_PATH.'functions/sidebars.php');

// Load our scripts
function saos_load_scripts() {
	wp_deregister_script('jquery');

	wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js", false, null);
	wp_register_script('bootstrap', get_template_directory_uri().'/js/bootstrap.js', array('jquery'));
    if ( is_user_logged_in() ) {
        
        if(get_field('membership_level', 'user_'.get_current_user_id()) != 'one') {
            
            wp_register_script('member_script', get_template_directory_uri().'/js/'.get_field("custom_pricing_script", "user_".get_current_user_id()), array('jquery'));
            wp_enqueue_script('member_script');
            
        }
        
    }
    
	wp_register_script('saos', get_template_directory_uri().'/js/script.js', array('jquery'));
	wp_register_script('saos_plugins', get_template_directory_uri().'/js/plugins.js', array('jquery'));
	wp_enqueue_script('jquery');
	wp_enqueue_script('bootstrap');
	wp_enqueue_script('saos');
	wp_enqueue_script('saos_plugins');
	if ( is_singular() ) { wp_enqueue_script( 'comment-reply' ); }
}
add_action( 'wp_enqueue_scripts', 'saos_load_scripts' );

// Add support for featured images
add_theme_support( 'post-thumbnails' );

function saos_mandrill_mail() {
wpMandrill::mail(
    'jsavage37@gmail.com, jon@studioaceofspade.com', // email to
     'testing a subject',  // email subject
     'asdf',               // email content
     $headers = '', 
     $attachments = array(), 
     $tags = array(), 
     $from_name = 'Conrad Grebel Furniture', 
     $from_email = 'noreply@conradgrebel.com', 
     $template_name = '');
}

add_action('wp_ajax_saos_build', 'saos_build');
add_action('wp_ajax_nopriv_saos_build', 'saos_build');

//Construct Loop & Results
function saos_build() {

    $data = $_POST;
    
    $html_start = '
    
    <html>
    <body>
    
    ';
    
    $html_end = '
    
    </body>
    </head>
    
    ';
    
    $body        = $html_start.stripcslashes($data['content']).$html_end;
    $user_body   = $html_start.stripcslashes($data['user_content']).$html_end;
   
    wpMandrill::mail(
         $data['to'] , 
         $data['subject'],  
         $body,             
         $headers       = '', 
         $attachments   = array(), 
         $tags          = array(), 
         $from_name     = $data['from_name'], 
         $from_email    = $data['from_email'], 
         $template_name = ''); 

}

add_action('wp_ajax_saos_user_build', 'saos_user_build');
add_action('wp_ajax_nopriv_saos_user_build', 'saos_user_build');

function saos_user_build() {
    
    $data = $_POST;
    
    $html_start = '
    
    <html>
    <body>
    
    ';
    
    $html_end = '
    
    </body>
    </head>
    
    ';
    
    $body        = $html_start.stripcslashes($data['content']).$html_end;
    $user_body   = $html_start.stripcslashes($data['user_content']).$html_end;
    
    wpMandrill::mail(
         $data['user_email'] , 
         $data['user_subject'],  
         $user_body,             
         $headers       = '', 
         $attachments   = array(), 
         $tags          = array(), 
         $from_name     = $data['from_name'], 
         $from_email    = $data['from_email'], 
         $template_name = '');
}

?>