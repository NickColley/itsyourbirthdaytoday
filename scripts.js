// on load
(function () {
  /*

    Warning. There is a list of blocked words in this document.
    This is to curb any abuse of the site. Or at least try.
    If it doesn't work I'll delete it.

    They're lots of slurs, if you'd prefer not read this leave now.

  */
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var DEFAULT_NAME = 'michael'

  var BLOCKED_TEXT = [
    'beaner',
    'beaners',
    'bimbos',
    'bulldyke',
    'coon',
    'darkie',
    'faggot',
    'fucktard',
    'fudge packer',
    'fudgepacker',
    'jail bait',
    'jailbait',
    'jigaboo',
    'jiggaboo',
    'jiggerboo',
    'kike',
    'lolita',
    'nambla',
    'negro',
    'nigga',
    'nigger',
    'nig nog',
    'paki',
    'raghead',
    'rape',
    'slave',
    'shemale',
    'slanteye',
    'towelhead',
    'tranny'
  ]

  // https://github.com/remy/remysharp.com/blob/master/public/blog/throttling-function-calls.md
  function debounce (fn, delay) {
    var timer = null
    return function () {
      var context = this
      var args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }

  function removeBlockedWords (text) {
    var foundBlockedText = false

    for (var i = 0; i < BLOCKED_TEXT.length; i++) {
      var blockedTextItem = BLOCKED_TEXT[i]
      var matchedBlockedTextItem = text.toLowerCase().indexOf(blockedTextItem) !== -1

      if (matchedBlockedTextItem) {
        foundBlockedText = true
        break
      }
    }

    return foundBlockedText ? DEFAULT_NAME : text
  }

  var hashName = decodeURIComponent(window.location.hash.slice(1))
  var name = removeBlockedWords(hashName || DEFAULT_NAME)
  var nameToSay
  var speechHasErrored = false
  var speechHasStarted = false
  var hasSpeechSupport = (
    ('speechSynthesis' in window) &&
    ('SpeechSynthesisUtterance' in window)
  )

  var ratsIntro = document.getElementById('ratsIntro')
  var ratsName = document.getElementById('ratsName')
  var ratsCakeAndIcecream = document.getElementById('ratsCakeAndIcecream')
  var ratsSuchAGoodBoy = document.getElementById('ratsSuchAGoodBoy')

  var ratsInput = document.querySelector('input')
  var ratsButton = document.querySelector('button')

  var firstTry = true

  ratsName.playbackRate = 1.25

  ratsInput.value = name
  ratsInput.addEventListener('change', setName)
  ratsInput.addEventListener('keyup', debounce(setName, 200))

  ratsButton.addEventListener('click', function () {
    ratsIntro.play()

    ratsName.play()
    ratsName.pause()

    ratsCakeAndIcecream.play()
    ratsCakeAndIcecream.pause()

    ratsSuchAGoodBoy.play()
    ratsSuchAGoodBoy.pause()

    ratsButton.innerHTML = 'loading...'
    ratsButton.disabled = true
  })

  ratsIntro.addEventListener('playing', function () {
    ratsButton.style.display = 'none'
  })

  ratsIntro.addEventListener('ended', function () {
    sayRatsName()
  })

  ratsName.addEventListener('ended', handleRatsNameEnd)

  ratsCakeAndIcecream.addEventListener('ended', function () {
    sayRatsName()
  })

  ratsSuchAGoodBoy.addEventListener('ended', function () {
    ratsIntro.play()
  })

  setName()
  setNameToSay()

  function setName () {
    if (ratsInput.value === name) {
      return
    }

    name = removeBlockedWords(ratsInput.value)

    if (name === '') {
      name = DEFAULT_NAME
    }

    window.location.hash = encodeURIComponent(name)
    window.document.title = name + ' it\'s your birthday today'
  }

  function handleRatsNameEnd () {
    if (firstTry) {
      ratsCakeAndIcecream.play()
    } else {
      ratsSuchAGoodBoy.play()
    }

    firstTry = !firstTry
  }

  function setNameToSay () {
    if (!hasSpeechSupport) {
      return
    }
    nameToSay = new window.SpeechSynthesisUtterance(name)
    nameToSay.pitch = 0.8
    nameToSay.rate = 1.25
    nameToSay.lang = 'en-US'

    speechHasStarted = false
    nameToSay.onstart = function () {
      speechHasStarted = true
    }
    nameToSay.onend = function () {
      if (!speechHasErrored) {
        handleRatsNameEnd()
      }
    }
    nameToSay.onerror = function () {
      speechHasErrored = true
      sayRatsName()
    }
  }

  function sayRatsName () {
    if (name === DEFAULT_NAME || !hasSpeechSupport || !nameToSay || speechHasErrored) {
      ratsName.play()
      return
    }
    setNameToSay()
    window.speechSynthesis.speak(nameToSay)
    // If the speech api times out, then fallback to the regular sound.
    setTimeout(function () {
      if (!speechHasStarted) {
        speechHasErrored = true
        sayRatsName()
      }
    }, 3000)
  }
})()
