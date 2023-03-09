window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
import Echo from '@ably/laravel-echo';

window.Ably = require('ably');

// Create new echo client instance using ably-js client driver.
window.Echo = new Echo({
    broadcaster: 'ably',
});

// Register a callback for listing to connection state change 
window.Echo.connector.ably.connection.on((stateChange) => {
    console.log("LOGGER:: Connection event :: ", stateChange);
    if (stateChange.current === 'disconnected' && stateChange.reason?.code === 40142) { // key/token status expired
        console.log("LOGGER:: Connection token expired https://help.ably.io/error/40142");
    }
});