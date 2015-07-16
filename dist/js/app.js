(function() {
  'use strict';
  var Config, MainCtrl, tip2;
  tip2 = angular.module('tip2-web', ['firebase', 'ngClipboard']);
  Config = function(ngClipProvider) {
    return ngClipProvider.setPath("/lib/zeroclipboard/dist/ZeroClipboard.swf");
  };
  MainCtrl = function($firebaseArray) {
    var ref, vm;
    ref = new Firebase('https://<YOUR-FIREBASE-APP>.firebaseio.com');
    vm = this;
    vm.name = 'tip2';
    vm.copies = $firebaseArray(ref);
    vm.copies.done = false;
    vm.copies.$loaded().then(function(copies) {
      return vm.copies.done = true;
    });
    vm.formatTime = function(time) {
      return moment.unix(time).format('llll');
    };
    vm.paste = function() {
      var content;
      content = prompt('paste something');
      if (!content || content === '') {
        return;
      }
      return vm.copies.$add({
        time: moment().unix(),
        text: content
      });
    };
    vm.fallback = function(copy) {
      return window.prompt('Press cmd+c to copy the text below.', copy);
    };
    vm.copyFirst = function() {
      if (vm.copies.length) {
        return vm.copies[vm.copies.length - 1].text;
      } else {
        return '';
      }
    };
  };
  MainCtrl.$inject = ['$firebaseArray'];
  Config.$inject = ['ngClipProvider'];
  tip2.config(Config).controller('MainCtrl', MainCtrl);
})();
