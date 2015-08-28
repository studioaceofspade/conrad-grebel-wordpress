<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', '');

/** MySQL database username */
define('DB_USER', '');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Vmh143J||MKu!(x?G+F::u7Ue`$-(61<_6k{$y,|($`|-+uh2v.u|7T^`i`k{j),');
define('SECURE_AUTH_KEY',  'mSBE%Ng QN@_Io5]@u!^J+y.EX-p8yOSz2>pVfu9^mh`+XZ#DTchN_^Zr=(a$_tE');
define('LOGGED_IN_KEY',    'eW_|V=+*~m:[1tyAZQtv^!C[+X`:|59Wc@#2irLwH1:38%3-spLqqydm}NeA&W,q');
define('NONCE_KEY',        '^[kLwdq^[Bva/19I3R=jvWt[s,wsu>3]<LdDP0hh&]e<P4W-uL+zDTjwyh)Kg6aV');
define('AUTH_SALT',        '?$~u.lp>+tg4nf3ft($4GSm1G!lS`N!2uXJsU`e}#l(yp*au% h:|)NXMg9,<R5R');
define('SECURE_AUTH_SALT', '|UO#xyjVjMtq.9w|+|%+f%&|jz7#6$&TEeq2/0WLz>;98z@0+a{,-}-OgeLkoh|:');
define('LOGGED_IN_SALT',   'SiIZZ~Z?Vmo4=geeeSF{6Hbc#QRpvfg+V@K5=Eu`{ZUc]W0>Wd`:j$R~Q>#G(HX;');
define('NONCE_SALT',       '_HpRW|P)wUt9Y32BV e_I!q#;IDhsPc~iyUf!/wd7xSY3&T~#y ucx2UV]rP|g%|');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
