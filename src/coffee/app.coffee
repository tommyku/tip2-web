do ->
  'use strict'

  tip2 = angular.module 'tip2-web', ['firebase']

  Config = ()->
    clipboard = new Clipboard '.copy-button'


    clipboard.on 'error', (e)->
      window.prompt('Press cmd+c to copy the text below.', e.text);

  MainCtrl = ($firebaseArray)->
    ref = new Firebase 'https://<YOUR-FIREBASE-APP>.firebaseio.com'
    vm = @
    vm.name = 'tip2'
    vm.copies = $firebaseArray ref
    vm.copies.done = false
    vm.copies
      .$loaded()
      .then (copies)->
        vm.copies.done = true
    vm.formatTime = (time)->
      moment
        .unix time
        .format 'llll'
    vm.paste = ()->
      content = prompt 'paste something'
      return if !content || content == ''
      vm.copies.$add
        time: moment().unix(),
        text: content

    vm.copyFirst = ->
      if vm.copies.length then vm.copies[vm.copies.length-1].text else ''

    return

  MainCtrl
    .$inject = ['$firebaseArray']

  Config
    .$inject = []

  tip2
    .config Config
    .controller 'MainCtrl', MainCtrl

  return
