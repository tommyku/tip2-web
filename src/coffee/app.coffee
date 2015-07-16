do ->
  'use strict'

  tip2 = angular.module 'tip2-web', ['firebase', 'ngClipboard']

  Config = (ngClipProvider)->
    ngClipProvider.setPath "/lib/zeroclipboard/dist/ZeroClipboard.swf"

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

    vm.fallback = (copy)->
      window.prompt('Press cmd+c to copy the text below.', copy);

    vm.copyFirst = ->
      if vm.copies.length then vm.copies[vm.copies.length-1].text else ''

    return

  MainCtrl
    .$inject = ['$firebaseArray']

  Config
    .$inject = ['ngClipProvider']

  tip2
    .config Config
    .controller 'MainCtrl', MainCtrl

  return
