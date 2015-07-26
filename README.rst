==========================
Chrome OAuth Bearer Plugin
==========================

Chrome browser plugin to inject OAuth 2 bearer tokens into outgoing HTTP requests (``Authorization`` header).

This plugin should allow browsing simple RESTful OAuth 2 resource servers directly from Chrome.
RESTful resource servers (microservices) should be kept simple and thus do not implement the full OAuth2 authorization code flow.

See also the `HTTPie Zign plugin`_ which does something similar for HTTP requests on the command line.

.. _HTTPie Zign plugin: https://pypi.python.org/pypi/httpie-zign


Usage
=====

1. cd <plugins_dir>
2. git clone git@github.com:zalando/chrome-oauth-bearer-plugin.git
3. open Chrome
4. open Chrome extensions [enter chrome://extensions/ in your navbar]
5. enable the developer mode
6. Load unpacked extensions ...
7. Select the plugin you just have downloaded via git
8. open options page
9. enter the token service URL, the URLs where the auth header should be added, your username and password
10. start using your APIs via Chrome



