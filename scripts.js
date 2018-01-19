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

  function removeBlockedWords (text) {
    var foundBlockedText = false

    for (var i = 0; i < BLOCKED_TEXT.length; i++) {
      var blockedTextItem = BLOCKED_TEXT[i]
      var matchedBlockedTextItem = text.indexOf(blockedTextItem) !== -1

      if (matchedBlockedTextItem) {
        foundBlockedText = true
        break
      }
    }

    return foundBlockedText ? DEFAULT_NAME : text
  }

  var hashName = decodeURIComponent(window.location.hash.slice(1))
  var name = removeBlockedWords(hashName || DEFAULT_NAME)

  var ratsIntro = document.getElementById('ratsIntro')
  var ratsName = document.getElementById('ratsName')
  var ratsCakeAndIcecream = document.getElementById('ratsCakeAndIcecream')
  var ratsSuchAGoodBoy = document.getElementById('ratsSuchAGoodBoy')

  var ratsInput = document.querySelector('input')
  var ratsButton = document.querySelector('button')

  var firstTry = true

  ratsName.playbackRate = 1.5

  ratsInput.value = name
  ratsInput.addEventListener('change', setName)
  ratsInput.addEventListener('keyup', setName)

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
    ratsButton.style.opacity = '0'
    ratsButton.style.transofrm = 'scale(0)'
  })

  ratsIntro.addEventListener('ended', function () {
    ratsName.play()
  })

  ratsName.addEventListener('ended', function () {
    setNameAudio()

    if (firstTry) {
      ratsCakeAndIcecream.play()
    } else {
      ratsSuchAGoodBoy.play()
    }

    firstTry = !firstTry
  })

  ratsCakeAndIcecream.addEventListener('ended', function () {
    ratsName.play()
  })

  ratsSuchAGoodBoy.addEventListener('ended', function () {
    ratsIntro.play()
  })

  setName()
  setNameAudio()

  if (window.innerWidth < 450) {
    ratsButton.style.display = 'block'
  } else {
    ratsIntro.play()
  }

  function setName () {
    if (ratsInput.value === name) {
      return
    }

    name = removeBlockedWords(ratsInput.value)

    if (name === '') {
      name = 'michael'
    }

    window.location.hash = encodeURIComponent(name)
    window.document.title = name + ' it\'s your birthday today'

    var isPlaying = !ratsName.paused || !!ratsName.currentTime

    if (!isPlaying) {
      setNameAudio()
    }
  }

  function setNameAudio () {
    if (name === 'michael') {
      ratsName.src = 'tunes/ratsName.mp3'
      return
    }

    var voice = 'usenglishmale2'
    var speed = 0
    var pitch = 0
    var apiKey = '34b06ef0ba220c09a817fe7924575123'

    var src = 'http://api.ispeech.org/api/rest' +
                 '?apikey=' + apiKey +
                 '&action=convert' +
                 '&voice=' + voice +
                 '&speed=' + speed +
                 '&pitch=' + pitch +
                 '&text=' + name

    ratsName.src = src
  }
})()
