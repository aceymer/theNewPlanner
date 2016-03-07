'use strict';

angular.module('newplannerApp.auth', [
  'newplannerApp.constants',
  'newplannerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
