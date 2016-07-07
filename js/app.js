(function() {
  'use strict';
  var Config, MainCtrl, tip2;
  tip2 = angular.module('tip2-web', ['firebase']);
  Config = function() {
    var clipboard;
    clipboard = new Clipboard('.copy-button');
    clipboard.on('success', function(e) {
      var snackbar;
      snackbar = document.querySelector('#toast');
      console.debug(snackbar.MaterialSnackbar);
      snackbar.MaterialSnackbar.showSnackbar({
        message: 'Copied to clipboard'
      });
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      return e.clearSelection();
    });
    return clipboard.on('error', function(e) {
      return window.prompt('Press cmd+c to copy the text below.', e.text);
    });
  };
  MainCtrl = function($firebaseArray) {
    var ref, vm;
    ref = new Firebase('https://brilliant-torch-9245.firebaseio.com/copies');
    vm = this;
    vm.name = 'tip2';
    vm.copies = $firebaseArray(ref);
    vm.copies.done = false;
    vm.content = '';
    vm.dialog = document.querySelector('dialog');
    if (!vm.dialog.showModal) {
      dialogPolyfill.registerDialog(vm.dialog);
    }
    vm.copies.$loaded().then(function(copies) {
      return vm.copies.done = true;
    });
    vm.paste = function() {
      vm.content = '';
      return vm.dialog.showModal();
    };
    vm.closeDialogOnly = function() {
      return vm.dialog.close();
    };
    vm.pasteAndCloseDialog = function() {
      vm.copies.$add({
        time: moment().unix(),
        text: vm.content
      });
      return vm.closeDialogOnly();
    };
  };
  MainCtrl.$inject = ['$firebaseArray'];
  Config.$inject = [];
  tip2.config(Config).controller('MainCtrl', MainCtrl);
})();
