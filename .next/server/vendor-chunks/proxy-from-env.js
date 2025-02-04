"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/proxy-from-env";
exports.ids = ["vendor-chunks/proxy-from-env"];
exports.modules = {

/***/ "(ssr)/./node_modules/proxy-from-env/index.js":
/*!**********************************************!*\
  !*** ./node_modules/proxy-from-env/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar parseUrl = (__webpack_require__(/*! url */ \"url\").parse);\n\nvar DEFAULT_PORTS = {\n  ftp: 21,\n  gopher: 70,\n  http: 80,\n  https: 443,\n  ws: 80,\n  wss: 443,\n};\n\nvar stringEndsWith = String.prototype.endsWith || function(s) {\n  return s.length <= this.length &&\n    this.indexOf(s, this.length - s.length) !== -1;\n};\n\n/**\n * @param {string|object} url - The URL, or the result from url.parse.\n * @return {string} The URL of the proxy that should handle the request to the\n *  given URL. If no proxy is set, this will be an empty string.\n */\nfunction getProxyForUrl(url) {\n  var parsedUrl = typeof url === 'string' ? parseUrl(url) : url || {};\n  var proto = parsedUrl.protocol;\n  var hostname = parsedUrl.host;\n  var port = parsedUrl.port;\n  if (typeof hostname !== 'string' || !hostname || typeof proto !== 'string') {\n    return '';  // Don't proxy URLs without a valid scheme or host.\n  }\n\n  proto = proto.split(':', 1)[0];\n  // Stripping ports in this way instead of using parsedUrl.hostname to make\n  // sure that the brackets around IPv6 addresses are kept.\n  hostname = hostname.replace(/:\\d*$/, '');\n  port = parseInt(port) || DEFAULT_PORTS[proto] || 0;\n  if (!shouldProxy(hostname, port)) {\n    return '';  // Don't proxy URLs that match NO_PROXY.\n  }\n\n  var proxy =\n    getEnv('npm_config_' + proto + '_proxy') ||\n    getEnv(proto + '_proxy') ||\n    getEnv('npm_config_proxy') ||\n    getEnv('all_proxy');\n  if (proxy && proxy.indexOf('://') === -1) {\n    // Missing scheme in proxy, default to the requested URL's scheme.\n    proxy = proto + '://' + proxy;\n  }\n  return proxy;\n}\n\n/**\n * Determines whether a given URL should be proxied.\n *\n * @param {string} hostname - The host name of the URL.\n * @param {number} port - The effective port of the URL.\n * @returns {boolean} Whether the given URL should be proxied.\n * @private\n */\nfunction shouldProxy(hostname, port) {\n  var NO_PROXY =\n    (getEnv('npm_config_no_proxy') || getEnv('no_proxy')).toLowerCase();\n  if (!NO_PROXY) {\n    return true;  // Always proxy if NO_PROXY is not set.\n  }\n  if (NO_PROXY === '*') {\n    return false;  // Never proxy if wildcard is set.\n  }\n\n  return NO_PROXY.split(/[,\\s]/).every(function(proxy) {\n    if (!proxy) {\n      return true;  // Skip zero-length hosts.\n    }\n    var parsedProxy = proxy.match(/^(.+):(\\d+)$/);\n    var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;\n    var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;\n    if (parsedProxyPort && parsedProxyPort !== port) {\n      return true;  // Skip if ports don't match.\n    }\n\n    if (!/^[.*]/.test(parsedProxyHostname)) {\n      // No wildcards, so stop proxying if there is an exact match.\n      return hostname !== parsedProxyHostname;\n    }\n\n    if (parsedProxyHostname.charAt(0) === '*') {\n      // Remove leading wildcard.\n      parsedProxyHostname = parsedProxyHostname.slice(1);\n    }\n    // Stop proxying if the hostname ends with the no_proxy host.\n    return !stringEndsWith.call(hostname, parsedProxyHostname);\n  });\n}\n\n/**\n * Get the value for an environment variable.\n *\n * @param {string} key - The name of the environment variable.\n * @return {string} The value of the environment variable.\n * @private\n */\nfunction getEnv(key) {\n  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || '';\n}\n\nexports.getProxyForUrl = getProxyForUrl;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJveHktZnJvbS1lbnYvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsZUFBZSw2Q0FBb0I7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLGVBQWU7QUFDMUIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvcHJveHktZnJvbS1lbnYvaW5kZXguanM/ZTEzNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBwYXJzZVVybCA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlO1xuXG52YXIgREVGQVVMVF9QT1JUUyA9IHtcbiAgZnRwOiAyMSxcbiAgZ29waGVyOiA3MCxcbiAgaHR0cDogODAsXG4gIGh0dHBzOiA0NDMsXG4gIHdzOiA4MCxcbiAgd3NzOiA0NDMsXG59O1xuXG52YXIgc3RyaW5nRW5kc1dpdGggPSBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoIHx8IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMubGVuZ3RoIDw9IHRoaXMubGVuZ3RoICYmXG4gICAgdGhpcy5pbmRleE9mKHMsIHRoaXMubGVuZ3RoIC0gcy5sZW5ndGgpICE9PSAtMTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB1cmwgLSBUaGUgVVJMLCBvciB0aGUgcmVzdWx0IGZyb20gdXJsLnBhcnNlLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVJMIG9mIHRoZSBwcm94eSB0aGF0IHNob3VsZCBoYW5kbGUgdGhlIHJlcXVlc3QgdG8gdGhlXG4gKiAgZ2l2ZW4gVVJMLiBJZiBubyBwcm94eSBpcyBzZXQsIHRoaXMgd2lsbCBiZSBhbiBlbXB0eSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGdldFByb3h5Rm9yVXJsKHVybCkge1xuICB2YXIgcGFyc2VkVXJsID0gdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgPyBwYXJzZVVybCh1cmwpIDogdXJsIHx8IHt9O1xuICB2YXIgcHJvdG8gPSBwYXJzZWRVcmwucHJvdG9jb2w7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVybC5ob3N0O1xuICB2YXIgcG9ydCA9IHBhcnNlZFVybC5wb3J0O1xuICBpZiAodHlwZW9mIGhvc3RuYW1lICE9PSAnc3RyaW5nJyB8fCAhaG9zdG5hbWUgfHwgdHlwZW9mIHByb3RvICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnJzsgIC8vIERvbid0IHByb3h5IFVSTHMgd2l0aG91dCBhIHZhbGlkIHNjaGVtZSBvciBob3N0LlxuICB9XG5cbiAgcHJvdG8gPSBwcm90by5zcGxpdCgnOicsIDEpWzBdO1xuICAvLyBTdHJpcHBpbmcgcG9ydHMgaW4gdGhpcyB3YXkgaW5zdGVhZCBvZiB1c2luZyBwYXJzZWRVcmwuaG9zdG5hbWUgdG8gbWFrZVxuICAvLyBzdXJlIHRoYXQgdGhlIGJyYWNrZXRzIGFyb3VuZCBJUHY2IGFkZHJlc3NlcyBhcmUga2VwdC5cbiAgaG9zdG5hbWUgPSBob3N0bmFtZS5yZXBsYWNlKC86XFxkKiQvLCAnJyk7XG4gIHBvcnQgPSBwYXJzZUludChwb3J0KSB8fCBERUZBVUxUX1BPUlRTW3Byb3RvXSB8fCAwO1xuICBpZiAoIXNob3VsZFByb3h5KGhvc3RuYW1lLCBwb3J0KSkge1xuICAgIHJldHVybiAnJzsgIC8vIERvbid0IHByb3h5IFVSTHMgdGhhdCBtYXRjaCBOT19QUk9YWS5cbiAgfVxuXG4gIHZhciBwcm94eSA9XG4gICAgZ2V0RW52KCducG1fY29uZmlnXycgKyBwcm90byArICdfcHJveHknKSB8fFxuICAgIGdldEVudihwcm90byArICdfcHJveHknKSB8fFxuICAgIGdldEVudignbnBtX2NvbmZpZ19wcm94eScpIHx8XG4gICAgZ2V0RW52KCdhbGxfcHJveHknKTtcbiAgaWYgKHByb3h5ICYmIHByb3h5LmluZGV4T2YoJzovLycpID09PSAtMSkge1xuICAgIC8vIE1pc3Npbmcgc2NoZW1lIGluIHByb3h5LCBkZWZhdWx0IHRvIHRoZSByZXF1ZXN0ZWQgVVJMJ3Mgc2NoZW1lLlxuICAgIHByb3h5ID0gcHJvdG8gKyAnOi8vJyArIHByb3h5O1xuICB9XG4gIHJldHVybiBwcm94eTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBnaXZlbiBVUkwgc2hvdWxkIGJlIHByb3hpZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhvc3RuYW1lIC0gVGhlIGhvc3QgbmFtZSBvZiB0aGUgVVJMLlxuICogQHBhcmFtIHtudW1iZXJ9IHBvcnQgLSBUaGUgZWZmZWN0aXZlIHBvcnQgb2YgdGhlIFVSTC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBnaXZlbiBVUkwgc2hvdWxkIGJlIHByb3hpZWQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzaG91bGRQcm94eShob3N0bmFtZSwgcG9ydCkge1xuICB2YXIgTk9fUFJPWFkgPVxuICAgIChnZXRFbnYoJ25wbV9jb25maWdfbm9fcHJveHknKSB8fCBnZXRFbnYoJ25vX3Byb3h5JykpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghTk9fUFJPWFkpIHtcbiAgICByZXR1cm4gdHJ1ZTsgIC8vIEFsd2F5cyBwcm94eSBpZiBOT19QUk9YWSBpcyBub3Qgc2V0LlxuICB9XG4gIGlmIChOT19QUk9YWSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIGZhbHNlOyAgLy8gTmV2ZXIgcHJveHkgaWYgd2lsZGNhcmQgaXMgc2V0LlxuICB9XG5cbiAgcmV0dXJuIE5PX1BST1hZLnNwbGl0KC9bLFxcc10vKS5ldmVyeShmdW5jdGlvbihwcm94eSkge1xuICAgIGlmICghcHJveHkpIHtcbiAgICAgIHJldHVybiB0cnVlOyAgLy8gU2tpcCB6ZXJvLWxlbmd0aCBob3N0cy5cbiAgICB9XG4gICAgdmFyIHBhcnNlZFByb3h5ID0gcHJveHkubWF0Y2goL14oLispOihcXGQrKSQvKTtcbiAgICB2YXIgcGFyc2VkUHJveHlIb3N0bmFtZSA9IHBhcnNlZFByb3h5ID8gcGFyc2VkUHJveHlbMV0gOiBwcm94eTtcbiAgICB2YXIgcGFyc2VkUHJveHlQb3J0ID0gcGFyc2VkUHJveHkgPyBwYXJzZUludChwYXJzZWRQcm94eVsyXSkgOiAwO1xuICAgIGlmIChwYXJzZWRQcm94eVBvcnQgJiYgcGFyc2VkUHJveHlQb3J0ICE9PSBwb3J0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTsgIC8vIFNraXAgaWYgcG9ydHMgZG9uJ3QgbWF0Y2guXG4gICAgfVxuXG4gICAgaWYgKCEvXlsuKl0vLnRlc3QocGFyc2VkUHJveHlIb3N0bmFtZSkpIHtcbiAgICAgIC8vIE5vIHdpbGRjYXJkcywgc28gc3RvcCBwcm94eWluZyBpZiB0aGVyZSBpcyBhbiBleGFjdCBtYXRjaC5cbiAgICAgIHJldHVybiBob3N0bmFtZSAhPT0gcGFyc2VkUHJveHlIb3N0bmFtZTtcbiAgICB9XG5cbiAgICBpZiAocGFyc2VkUHJveHlIb3N0bmFtZS5jaGFyQXQoMCkgPT09ICcqJykge1xuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgd2lsZGNhcmQuXG4gICAgICBwYXJzZWRQcm94eUhvc3RuYW1lID0gcGFyc2VkUHJveHlIb3N0bmFtZS5zbGljZSgxKTtcbiAgICB9XG4gICAgLy8gU3RvcCBwcm94eWluZyBpZiB0aGUgaG9zdG5hbWUgZW5kcyB3aXRoIHRoZSBub19wcm94eSBob3N0LlxuICAgIHJldHVybiAhc3RyaW5nRW5kc1dpdGguY2FsbChob3N0bmFtZSwgcGFyc2VkUHJveHlIb3N0bmFtZSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgZm9yIGFuIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRFbnYoa2V5KSB7XG4gIHJldHVybiBwcm9jZXNzLmVudltrZXkudG9Mb3dlckNhc2UoKV0gfHwgcHJvY2Vzcy5lbnZba2V5LnRvVXBwZXJDYXNlKCldIHx8ICcnO1xufVxuXG5leHBvcnRzLmdldFByb3h5Rm9yVXJsID0gZ2V0UHJveHlGb3JVcmw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/proxy-from-env/index.js\n");

/***/ })

};
;