do ->
  'use strict'

  tip2 = angular.module 'tip2-web', ['firebase']

  Config = ()->
    clipboard = new Clipboard '.copy-button'

    clipboard.on 'success', (e)->
      snackbar = document.querySelector('#toast')
      console.debug snackbar.MaterialSnackbar
      snackbar.MaterialSnackbar.showSnackbar {message: 'Copied to clipboard'}
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)
      e.clearSelection()

    clipboard.on 'error', (e)->
      window.prompt('Press cmd+c to copy the text below.', e.text)

  MainCtrl = ($firebaseArray)->
    ref = new Firebase 'https://<YOUR-FIREBASE-APP>.firebaseio.com'
    vm = @
    vm.name = 'tip2'
    vm.copies = $firebaseArray ref
    vm.copies.done = false
    vm.content = ''
    vm.dialog = document.querySelector('dialog')
    if (!vm.dialog.showModal)
      dialogPolyfill.registerDialog(vm.dialog)
    vm.copies
      .$loaded()
      .then (copies)->
        vm.copies.done = true
    vm.paste = ->
      vm.content = ''
      vm.dialog.showModal()
    vm.closeDialogOnly = ->
      vm.dialog.close()
    vm.pasteAndCloseDialog = ->
      vm.copies.$add
        time: moment().unix(),
        text: vm.content
      vm.closeDialogOnly()
    return

  MainCtrl
    .$inject = ['$firebaseArray']

  Config
    .$inject = []

  tip2
    .config Config
    .controller 'MainCtrl', MainCtrl

  return
