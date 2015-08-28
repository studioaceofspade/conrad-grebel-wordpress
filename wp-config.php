<?php

/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'conradgrebel');

/** MySQL database username */
define('DB_USER', 'conradgrebel');

/** MySQL database password */
define('DB_PASSWORD', 'Kickin00!?');

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
define('AUTH_KEY',         '.:HdEm){St[.)}MLz<6HRPJn0:^}*X%1 I~f$FNs-$Y_2$(WfrT g=B]V&q9mx^N');
define('SECURE_AUTH_KEY',  'x-OnN83uLTY|;RYQE<kWhJl{L8 lE?PLWiICEdnTTx%wIcWEm3]4_Q3aK4$QgP=h');
define('LOGGED_IN_KEY',    'U;*$FT^9mI<N0g+OV+DWon6t+W4%s9tSNW.;scMy(iD58<3BjXu&kF9>wimV~^v9');
define('NONCE_KEY',        'xFhbjrK^eenDn0%X-Q<C05*ls|&iururad-zsm1Bkv*(&,BhNCmI[@s`<v>@|Dy~');
define('AUTH_SALT',        'G4pdQA0E`*!?D(+u[DEP1fnW*l|x7*=)-eM9lFe1XQ>,O>d-C6kPlBH}f(4r?AS[');
define('SECURE_AUTH_SALT', '}zs3A5s>.7qK8v*e-RO-,=O7%JE4`rmhY@A$iLWi9+x`Br;b/9C}liGr~xP~9Mpl');
define('LOGGED_IN_SALT',   '6f9|+X1V~Ll<Ep|q.E=yB@-v7VoiRATm?-v+M->2fMMJCKuy61Kh*J{%IV2`3sG{');
define('NONCE_SALT',       '=~I,,GVBphBP`UDfc=riP[fiviYxN:=Gdw`Fx1m%iQKXP7H?&$]%|+--i.X{[F1+');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
