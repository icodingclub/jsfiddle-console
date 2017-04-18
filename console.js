(function () {
    var _console = window.console;
    var _methods = {
        log: window.console.log,
        error: window.console.error,
        info: window.console.info,
        debug: window.console.debug,
        clear: window.console.clear,
    };
    var $body = document.body;

    function append (message) {
        $body.append(message);
    }

    function clear () {
        $body.innerHtml = "";
        _methods.clear.call(_console);
    };

    function message (text, color, $message) {
        $message = document.createElement('span');
        $message.style.color = color || '#000000';
        $message.innerText = text;
        return $message;
    }

    function write (key, color) {
        return function () {
            Function.prototype.apply.call(_methods[key], _console, arguments);
            append(message(Array.prototype.slice.call(arguments).join(' '), color));
        };
    }

    window.console.clear = clear;
    window.console.error = write('error', '#ff0000');
    window.console.log = write('log');
    window.console.info = write('info');
    window.console.debug = write('debug');

    function errorHandler (e) {
        e.preventDefault();
        console.error(e.message);
        return true;
    }

    if (window.attachEvent) {
        window.attachEvent('onerror', errorHandler);
    }
    else {
        window.addEventListener('error', errorHandler, true);
    }
}) ();
