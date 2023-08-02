(function() {

    var scriptsParentElt = (document.getElementsByTagName("head")[0] || document.documentElement);
    var jQuery, $, ssoPopup, hiddenIframe, fbPopup, clearTokenIframe;
    var isSdkReady = false;

    if (!window['ClassyObjectName']) {
        // Happens when the old SDK snippet is used by a client. In this case, the ClassyObject was instanciated in the
        // global "Classy" variable.
        window['ClassyObjectName'] = 'Classy';
    }

    var ClassyObject = window[window['ClassyObjectName']];

    if (ClassyObject.params) {
        // The old sdk snippet already defines ClassyObject.clientId. The new sdk snippet passes it through the params
        // object.
        ClassyObject.clientId = ClassyObject.params.client_id;
        ClassyObject.appCookieName = ClassyObject.params.app_cookie_name;
        ClassyObject.oktaScope = ClassyObject.params.okta_scope;
        ClassyObject.oktaClientId = ClassyObject.params.okta_client_id;
        ClassyObject.redirect_uri = ClassyObject.params.redirect_uri;
    }

    /**
     * The base_url is used for routing purposes as well as validating
     * the event.origin for messages posted to the iframe.
     *
     * The base_prefix is used to prefix routes with the appropriate sso
     * route prefix.
     */
    var base_url = ClassyObject.params.override_base_url || window.location.origin;
    var base_prefix = ClassyObject.params.override_base_prefix || "/sso";

    // Injected on server side
    var live_app_origin = 'https://live.classy.org';
    var classy_origins  = 'https://www.classy.org'.split(' ');
    
    // Determine whether or not the Classy Live authentication token should be
    // cleared. For now, this is only true if the parent domain is a recognized
    // Classy domain. Domain masked sites are excluded, because they do not 
    // share authentication state with the main Classy platform.
    function _shouldClearToken() {
        var this_origin = new URL(window.location).origin.toLowerCase();
        return classy_origins.includes(this_origin);
    }

    function _createClearTokenIFrame() {
       // Create a hidden iframe within which to clear the Classy Live token, if any
       var $liveIframe = $('<iframe>', {
            src: live_app_origin + '/auth/clear-token'
       }).hide();  
       clearTokenIframe = $liveIframe[0]; 
       $liveIframe.appendTo($('body'));
    }

    /**
     * Clears the Classy Live authentication token from local storage. This must
     * be done through an iframe and postMessage
     */
    function _clearToken(callback) {  
        // Ensure callback is called exactly once
        var called = false;
        var tohandle = null;
        function ensure_callback(timedOut) {
            if (called) {
                return;
            }

            called = true;
            
            if (timedOut === true) {
                console.warn(window['ClassyObjectName'] + '.logout: Timed out waiting to clear token');
            } else {    
                clearTimeout(tohandle);
            }
            callback();
        }

        if (clearTokenIframe == null) {
            // Clear token frame never initialized.
            ensure_callback();
            return;
        }

        // Don't wait more than 100ms for clear token mechanics
        tohandle = setTimeout(ensure_callback, 100, true);

        function handleMessage(e) {
            if (e.origin !== live_app_origin) {
                return;
            }
            if (e.data == null || e.data.type != 'token_cleared') {
                console.warn(window['ClassyObjectName'] + '.logout: Unexpected message: ' + JSON.stringify(e.data));
            }
            window.removeEventListener("message", handleMessage);
            ensure_callback();
        }

        window.addEventListener("message", handleMessage); 
 
        // Post the message to tell the child page to clear the Classy Live authentication
        // token. It will respond with the token_cleared event handled above 
        clearTokenIframe.contentWindow.postMessage({
            type: 'clear_token'    
        }, live_app_origin); 
    }

    /**
     * Opens a popup to initiate Oauth2 authorization code flow.
     */
    ClassyObject.login = function (options, callbackFunc) {
        alertIfSdkNotReady('login');

        // check if a connect popup is not already opened. Just bringing the popup to the foreground if that's the case.
        if ( typeof ssoPopup == 'undefined' || ssoPopup.closed ) {
            // Defining handler to receive popup message.
            var messageHandler = function(event) {
                // check origin - only accepting messages sent by login.classy.org
                if (event.origin == base_url) {
                    var message = JSON.parse(event.data);
                    if (message.idp_url || message.authorization_code || message.error) {
                        window.removeEventListener("message", messageHandler);
                        ssoPopup.postMessage('response_received', base_url); // acknowledging the response so that the popup can close itself.
                        if (typeof callbackFunc === 'string') {
                            window[callbackFunc](message);
                        } else if (typeof callbackFunc === 'function') {
                            callbackFunc(message);
                        }
                    }
                }
            };

            window.addEventListener("message", messageHandler, false);

            // opening popup
            var w = 400;
            var h = 700; // FIXME popup height should be automatically set based on popup content.
            var ww = $(window).width();
            var wh = $(window).height();
            var l = ww/2 - w/2;
            var t = wh/2 - h/2;

            options.method = 'popup';

            var url = buildAuthorizationUrl(options);
            var defaultParam = "no";
            var params = 'location=' + defaultParam + ', menubar=' + defaultParam + ', resizable=' + defaultParam + ', status=' + defaultParam + ', titlebar=' + defaultParam + ', height=' + h + ', top=' + t + ',left=' + l + ',width=' + w;

            ssoPopup = window.open(url, 'ClassyPopup', params);
        } else {
            ssoPopup.focus();
        }

        return false;
    };

    /**
     * Logout
     */
    ClassyObject.logout = function (callbackFunc) {
        alertIfSdkNotReady('logout');

        var doLogout = function() {
            $.ajax({
                url: base_url + base_prefix + "/logout",
                dataType: "jsonp",
                success: function() {
                    callbackFunc();
                }
            });
        };

        if(_shouldClearToken()) {
            _clearToken(doLogout);
        } else {
            doLogout();
        }
    };

    /**
     * Generate iframe for login
     *
     * @param  $iframeContainer HTML element that will contain the iframe
     * @param  options SSO options. Ex: {"flow":"login_only", "campaign_id": "123", "...", "..."}.
     * @param  callbackFunc Function executed once the user authenticated and granted access to the requesting app on SSO.
     * @private
     */
    function _createIframe($iframeContainer, options, callbackFunc) {
        options.method = 'iframe';
        var url = buildAuthorizationUrl(options);
        var $iframe = _fillIframeContainer($iframeContainer, url);

        var messageHandler = function(event) {
            // check origin - only accepting messages sent by login.classy.org
            if (event.origin == base_url) {

                if (event.data == '3rd_party_cookies_refused') {
                    $iframeContainer.empty();
                    window.removeEventListener("message", messageHandler);
                    _createFallbackIframe($iframeContainer, options, callbackFunc);
                    return;
                }

                var message;
                try {
                    message = JSON.parse(event.data);
                } catch(e) {}

                if (message && (message.idp_url || message.authorization_code || message.error)) {
                    window.removeEventListener("message", messageHandler);
                    if (typeof callbackFunc === 'string') {
                        window[callbackFunc](message);
                    } else if (typeof callbackFunc === 'function') {
                        callbackFunc(message);
                    }
                }
            }
        };

        window.addEventListener("message", messageHandler, false);
    }

    /**
     * In case SSO iframe method fails because of third party cookie being blocked by browser, this method
     * will load a simple login button in the iframe container, that will trigger SSO with the popup method.
     *
     * @param  $iframeContainer HTML element that will contain the iframe
     * @param  options SSO options. Ex: {"flow":"login_only", "campaign_id": "123", "...", "..."}.
     * @param  callbackFunc Function executed once the user authenticated and granted access to the requesting app on SSO.
     * @private
     */
    function _createFallbackIframe($iframeContainer, options, callbackFunc) {
        var url = buildAuthorizationUrl(options, 'fallback_iframe');
        var $iframe = _fillIframeContainer($iframeContainer, url);

        // $iframe.click() & $iframeContainer.click() won't work. Can't bind onclick events to iframes
        // apparently. Or maybe that's because the content of the iframe is on an other domain.
        // Anyway: overlaying the iframe with a transparent div on which we'll bind the onclick event.
        $('<div>')
            .css({
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'left': 0,
                'top': 0,
                'cursor': 'pointer'
            })
            .click(function() {
                Classy.login(options, function(SSO_response) {
                    $iframeContainer.empty();
                    if (typeof callbackFunc === 'string') {
                        window[callbackFunc](SSO_response);
                    } else if (typeof callbackFunc === 'function') {
                        callbackFunc(SSO_response);
                    }
                });
            })
            .appendTo($iframeContainer.css('position', 'relative'));
    }

    /**
     * Populates an HTML container, `$iframeContainer`, with an iframe displaying a page hosted at `url`
     * Make iframe resizer automatically set the iframe height based on its content.
     *
     * @param  $iframeContainer
     * @param  url
     * @returns  {jQuery} The created iframe.
     * @private
     */
    function _fillIframeContainer($iframeContainer, url) {
        $iframeContainer.empty();

        var $iframe = $('<iframe>', {
            src: url,
            scrolling: 'no',
            frameborder: 0,
            width: '100%',
            allowtransparency: true
        }).appendTo($iframeContainer);

        var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1); // Detect IE10 and below

        if (typeof iFrameResize === 'function') {
            $iframe.on('load', function () {
                iFrameResize({
                    log: false,
                    heightCalculationMethod: isOldIE ? 'max' : 'taggedElement'
                }, $iframe[0]);
            });
        }

        return $iframe;
    }

    /**
     * Parse Dom on demand
     */
    ClassyObject.parseDom = function (callbackFunc) {
        alertIfSdkNotReady('parseDom');

        if(_shouldClearToken()) {
            _createClearTokenIFrame();
        }

        // Binding ClassyObject.login() method to elements with "classy-login-btn" class.
        $('a.classy-login-btn').not('.classy-parsed').addClass('classy-parsed').click(function () {
            var options = {};
            options.scope = $(this).data('scope') ? $(this).data('scope') : 'read_profile';
            options.org_id = $(this).data('org_id') ? $(this).data('org_id') : null;
            options.layout = $(this).data('layout') ? $(this).data('layout') : null;
            options.flow = $(this).data('flow') ? $(this).data('flow') : null;
            options.campaign_id = $(this).data('campaign_id') ? $(this).data('campaign_id') : null;
            var callback = typeof callbackFunc === "function" ? callbackFunc : $(this).data('callback');
            ClassyObject.login(options, callback);
            return false;
        });

        // Creating sso iframe if any placeholder is defined
        $('div.classy-login-iframe').not('.classy-parsed').addClass('classy-parsed').each(function() {
            var options = {};
            options.scope = $(this).data('scope') ? $(this).data('scope') : 'read_profile';
            options.org_id = $(this).data('org_id') ? $(this).data('org_id') : null;
            options.layout = $(this).data('layout') ? $(this).data('layout') : null;
            options.flow = $(this).data('flow') ? $(this).data('flow') : null;
            options.campaign_id = $(this).data('campaign_id') ? $(this).data('campaign_id') : null;
            options.original_url = $(this).data('original_url') ? $(this).data('original_url') : null;
            options.passwod_reset_code = $(this).data('passwod_reset_code') ? $(this).data('passwod_reset_code') : null;
            options.member_id = $(this).data('member_id') ? $(this).data('member_id') : null;
            // This variable is used to generate the password reset url in the way that angularjs waiting for.
            // AngularJs have a problem with the router that can handle the querystring before the #, with this parameter
            // the backend will know how to generate the correct url.
            options.is_angularjs_mode = $(this).data('is_angularjs_mode') ? $(this).data('is_angularjs_mode') : null;
            
            var callback = typeof callbackFunc === "function" ? callbackFunc : $(this).data('callback');
            _createIframe($(this), options, callback);
        });
    };

    /**
     * Gets the user session state on login.classy.org
     * `response` if of the form:
     * {
     *     is_logged_in: true,
     *     has_authorized: false
     * }
     */
    ClassyObject.status = function(callbackFunc) {
        alertIfSdkNotReady('status');

        $.ajax({
            url: base_url + base_prefix + "/status?client_id=" + encodeURIComponent(ClassyObject.clientId),
            dataType: "jsonp",
            success: function(response) {
                callbackFunc(response);
            }
        });
    };

    /******** Load jQuery *********/
    loadScript('https://code.jquery.com/jquery-3.6.1.min.js', function() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        $ = jQuery;

        // Call our main function
        init();
    });

    /**
     * Dynamically & asynchronously loads a js script located at src. Trigger callback function once script is
     * loaded.
     */
    function loadScript(src, callback) {
        var script_tag = document.createElement('script');

        if(callback) {
            script_tag.onload = callback;
        }

        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src", src);
        script_tag.setAttribute('crossorigin', true);
        scriptsParentElt.appendChild(script_tag);
    }

    /**
     * Init script. Will parse the document and bind Classy login method to buttons and/or iframe if present.
     */
    function init() {
        // exposing the jquery object used by the SDK
        ClassyObject.$ = $;

        function callback() {
            isSdkReady = true;

            if (!ClassyObject.params.skip_dom_parsing) {
                ClassyObject.parseDom();
            }

            executeReadyCallbacks();
        }

        if (!ClassyObject.params.skip_iframe_resizer) { // Support skipping of the loading iFrameResizer (classyapp - dev)
            $.ajax({
                url: base_url + base_prefix + "/ssobuild/js/iframeResizer-6bb8ec1b02.js",
                dataType: "script",
                cache: true,
                success: callback
            });
        } else {
            callback();
        }

    }

    function executeReadyCallbacks(){
        if (ClassyObject.onReady) {
            if (typeof ClassyObject.onReady === 'function') {
                console.warn('Classy Login - You are using an old version of javascript snippet. Please upgrade!');

                ClassyObject.onReady = [ClassyObject.onReady];
            }

            ClassyObject.onReady.forEach(executeReadyCallback);
        }

        // making sure that any new call to Classy.ready(callback) will execute callback() right away.
        ClassyObject.ready = executeReadyCallback;
    }

    function executeReadyCallback(callback) {
        if (typeof callback === 'function') {
            window.setTimeout(callback);
        } else {
            console.warn(window['ClassyObjectName'] + '.ready() expects a callback.');
        }
    }

    /**
     * Helper to generate the url toward the authorize endpoint.
     *
     * @param  options.scope comma separated list of requested scopes
     * @param  options.method SSO method used. Can be "iframe", "popup" or "redirect"
     * @param  options.org_id To be set when SSO must be styled with an organization branding.
     * @param  options.layout "v1" or "v2" to choose between the legacy or the new Classy look and feel.
     * @param  options.flow "login", "signup" or "login_only" indicates which form are displayed by default. login_only => the user can't signup.
     */
    function buildAuthorizationUrl(options, path) {
        path = path || 'authorize';

        var url = base_url + base_prefix + '/' + path + '?';
        url += '&response_type=code';
        url += '&client_id=' + encodeURIComponent(ClassyObject.clientId);
        url += '&scope=' + encodeURIComponent(options.scope);

        if (ClassyObject.oktaClientId) {
            url += '&okta_client_id=' + ClassyObject.oktaClientId;
        }

        if (ClassyObject.redirect_uri) {
            url += '&redirect_uri=' + encodeURIComponent(ClassyObject.redirect_uri)
        }

        if (ClassyObject.oktaScope) {
            url += '&okta_scope=' + ClassyObject.oktaScope;
        }

        if (ClassyObject.appCookieName) {
            url += '&app_cookie_name=' + ClassyObject.appCookieName;
        }

        if (options.method) {
            url += '&sso_method=' + options.method;
        }

        if (options.campaign_id) {
            url += '&campaign_id=' + encodeURIComponent(options.campaign_id);
        }

        if (options.org_id) {
            url += '&org_id=' + encodeURIComponent(options.org_id);
        }

        if (options.layout) {
            url += '&layout=' + encodeURIComponent(options.layout);
        }

        if (options.flow) {
            url += '&flow=' + encodeURIComponent(options.flow);
        }

        if (options.original_url ) {
            url += '&original_url=' + encodeURIComponent(options.original_url);
        }

        if (options.passwod_reset_code) {
            url += '&passwod_reset_code=' + encodeURIComponent(options.passwod_reset_code);
        }

        if (options.member_id) {
            url += '&member_id=' + encodeURIComponent(options.member_id);
        }

        if (options.is_angularjs_mode) {
            url += '&is_angularjs_mode=' + encodeURIComponent(options.is_angularjs_mode);
        }

        return url;
    }

    function alertIfSdkNotReady(methodCalled) {
        if (!isSdkReady) {
            console.warn(window['ClassyObjectName'] + "." + methodCalled + "() should be called within a callback passed to " + window['ClassyObjectName'] + ".ready().");
        }
    }

    function resetIframe () {
        $(window).off('message');

        if (hiddenIframe) {
            hiddenIframe.remove();
            hiddenIframe = null;
        }
    }

    /**
     * Submit a form using the hidden iframe.
     */
    function submitForm (action, payload, cb) {
        resetIframe();

        var iframeUrl = base_url + base_prefix + '/hidden_iframe';
        var origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

        hiddenIframe = $('<iframe src="' + iframeUrl + '"></iframe>').hide();

        var timeout = setTimeout(function () {
            resetIframe();
            cb({ error: 'ERR_TIMED_OUT' });
        }, 30000);

        function handler (e) {
            if (e.originalEvent.origin !== base_url) return;
            var response = JSON.parse(e.originalEvent.data);

            if (response.status === 'ready') {
                hiddenIframe[0].contentWindow.postMessage(JSON.stringify({
                    action: action,
                    clientId: ClassyObject.clientId,
                    payload: payload,
                    origin: origin
                }), base_url);
            }
            else {
                resetIframe();
                clearTimeout(timeout);
                cb(response.data);
            }
        }

        $(window).on('message', handler);
        hiddenIframe.appendTo('body');
    }

    function checkRequired (payload, inputs) {
        var missingFields = [];

        for (var i=0; i < inputs.length; i++) {
            if (!payload[inputs[i]]) {
                missingFields.push(inputs[i]);
            }
        }

        return missingFields.length ? missingFields : false;
    }

    /**
     * Process signup using hidden iframe.
     */
    ClassyObject.submitSignupForm = function(payload, cb) {
        alertIfSdkNotReady('submitSignupForm');

        if (!cb || typeof cb !== 'function') {
            throw new Error(window['ClassyObjectName'] + ".submitSignupForm() requires a callback.");
        }

        if (typeof payload !== 'object') {
            cb({ error: 'ERR_MALFORMED_PAYLOAD' });
            return;
        }

        var missingFields = checkRequired(payload, ['firstName', 'lastName', 'email', 'password']);

       if (missingFields) {
            cb({
                error: 'ERR_VALIDATION_ERROR',
                missingFields: missingFields
            });
            return;
        }

        submitForm('signup', payload, cb);
    };

    /**
     * Process login using hidden iframe.
     */
    ClassyObject.submitLoginForm = function(payload, cb) {
        alertIfSdkNotReady('submitLoginForm');

        if (!cb || typeof cb !== 'function') {
            throw new Error(window['ClassyObjectName'] + ".submitLoginForm() requires a callback.");
        }

        if (typeof payload !== 'object') {
            cb({ error: 'ERR_MALFORMED_PAYLOAD' });
            return;
        }

        var missingFields = checkRequired(payload, ['email', 'password']);

        if (missingFields) {
            cb({
                error: 'ERR_VALIDATION_ERROR',
                missingFields: missingFields
            });
            return;
        }

        submitForm('login', payload, cb);
    };

    /**
     * Open Facebook login popup.
     */
    ClassyObject.loginWithFacebook = function (cb) {
        var finished = false;
        var url = base_url + base_prefix + '/fb_redirect?client_id=' + ClassyObject.clientId + '&response_type=code&sso_method=popup';

        alertIfSdkNotReady('loginWithFacebook');

        if (!cb || typeof cb !== 'function') {
            throw new Error(window['ClassyObjectName'] + ".loginWithFacebook() requires a callback.");
        }

        if (!fbPopup || fbPopup.closed) {
            function handler (e) {
                if (e.originalEvent.origin !== base_url) return;
                var response = JSON.parse(e.originalEvent.data);
                cb(response);
                finished = true;
                fbPopup.close();
                $(window).off('message', handler);
            }

            $(window).on('message', handler);

            var params = [
                'location=no',
                'menubar=no',
                'resizable=no',
                'status=no',
                'titlebar=no',
                'width=500',
                'height=500',
                'top=' + ($(window).height() - 500)/2,
                'left=' + ($(window).width() - 500)/2
            ].join(',');

            fbPopup = window.open(url, 'FacebookPopup', params);

            var interval = setInterval(function () {
                if (fbPopup.closed && !finished) {
                    cb({ error: 'ERR_WINDOW_CLOSED' });
                    finished = true;
                    clearInterval(interval);
                    $(window).off('message', handler);
                }
            }, 200);
        } else {
            fbPopup.focus();
        }
        return false;

    }
})();
