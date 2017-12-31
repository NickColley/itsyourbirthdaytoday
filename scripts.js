// on load
(function () {
  var name = decodeURIComponent(window.location.hash.slice(1)) || 'michael'

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

    name = ratsInput.value

    if (name === '') {
      name = 'michael'
    }

    window.location.hash = encodeURIComponent(name)
    window.document.title = name + ' it\'s your birthday today'
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
