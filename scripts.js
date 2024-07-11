// on load
(function () {
  const DEFAULT_NAME = "michael";
  const DEFAULT_IDENTITY = "boy";

  const HAS_SPEECH_SUPPORT =
    "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  function createSpeechSynthesis(text) {
    if (!HAS_SPEECH_SUPPORT) {
      return null;
    }

    const speechSynthesis = new window.SpeechSynthesisUtterance(text);
    speechSynthesis.pitch = 0.8;
    speechSynthesis.rate = 1.25;

    return speechSynthesis;
  }

  function textToSpeech(speechSynthesis) {
    return new Promise((resolve, reject) => {
      if (!speechSynthesis) {
        return reject();
      }

      let speechHasStarted = false;
      speechSynthesis.onstart = function () {
        speechHasStarted = true;
      };
      speechSynthesis.onend = function () {
        resolve();
      };
      speechSynthesis.onerror = function () {
        reject();
      };

      window.speechSynthesis.speak(speechSynthesis);

      // If the speech api times out, then fallback to the regular sound.
      setTimeout(function () {
        if (!speechHasStarted) {
          reject();
        }
      }, 3000);
    });
  }

  function setQueryParams(key, value) {
    const queryParams = new URLSearchParams(window.location.search);

    // Set new or modify existing page value
    queryParams.set(key, value);

    // Replace current querystring with the new one
    history.replaceState(null, null, "?" + queryParams.toString());
  }

  function setTitle(name) {
    window.document.title = name + ", it's your birthday today";
  }

  // https://github.com/remy/remysharp.com/blob/master/public/blog/throttling-function-calls.md
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  function removeBlockedWords(text, fallbackText) {
    const foundBlockedText = window.BLOCKED_TEXT.some((blockedTextItem) => {
      return text.toLowerCase().includes(blockedTextItem);
    });

    return foundBlockedText ? fallbackText : text;
  }

  // for old URLs that used to use the hash
  const hashName = decodeURIComponent(window.location.hash.slice(1));

  const params = new URLSearchParams(window.location.search);
  const paramsName = params.has("name")
    ? decodeURIComponent(params.get("name"))
    : null;
  const paramsIdentity = params.has("identity")
    ? decodeURIComponent(params.get("identity"))
    : null;

  const inputName = document.querySelector("#input-name");
  const inputIdentity = document.querySelector("#input-identity");
  const animation = document.querySelector(".video");
  const playButton = document.querySelector("#play");
  const muteButton = document.querySelector("#mute");
  const reduceMotionButton = document.querySelector("#reduce-motion");
  const customiseDetails = document.querySelector("details");

  // if we click off details element, close it
  customiseDetails.addEventListener("click", (event) => {
    if (event.target === customiseDetails) {
      customiseDetails.removeAttribute("open");
    }
  });

  const name = removeBlockedWords(
    paramsName || hashName || DEFAULT_NAME,
    DEFAULT_NAME
  );

  const identity = removeBlockedWords(
    paramsIdentity || DEFAULT_IDENTITY,
    DEFAULT_IDENTITY
  );

  const state = {
    name,
    nameSpeechSynthesis: createSpeechSynthesis(name),
    identity,
    identitySpeechSynthesis: createSpeechSynthesis(identity),
    firstTry: true,
  };

  inputName.value = state.name;
  inputIdentity.value = state.identity;

  if (state.name && state.name !== DEFAULT_NAME) {
    setTitle(state.name);
  }

  function setName() {
    if (inputName.value === state.name) {
      return;
    }

    state.name = removeBlockedWords(inputName.value, DEFAULT_NAME);

    if (state.name === "") {
      state.name = DEFAULT_NAME;
    }

    state.nameSpeechSynthesis = createSpeechSynthesis(state.name);

    setQueryParams("name", encodeURIComponent(state.name));

    setTitle(state.name);
  }

  function setIdentity() {
    if (inputIdentity.value === state.identity) {
      return;
    }

    state.identity = removeBlockedWords(inputIdentity.value, DEFAULT_IDENTITY);

    if (state.identity === "") {
      state.identity = DEFAULT_IDENTITY;
    }

    state.identitySpeechSynthesis = createSpeechSynthesis(state.identity);

    setQueryParams("identity", encodeURIComponent(state.identity));
  }

  setName();
  setIdentity();

  inputName.addEventListener("change", setName);
  inputName.addEventListener("keyup", debounce(setName, 200));

  inputIdentity.addEventListener("change", setIdentity);
  inputIdentity.addEventListener("keyup", debounce(setIdentity, 200));

  const ratsSpriteOptions = {
    intro: [0, 7600],
    name: [7600, 550],
    cakeAndIcecream: [8150, 3600],
    suchAGoodBoy: [12200, 550],
    boy: [12750, 250],
    thisYearWowWeGonnaCheer: [13000, 2650],
  };
  const ratsSprite = new window.Howl({
    src: ["rats.mp3"],
    sprite: ratsSpriteOptions,
  });
  const ratsSpriteParts = {};

  // Allow muting audio.
  let isMuted = false;
  const originalMuteLabel = muteButton.textContent;
  muteButton.addEventListener("click", function () {
    isMuted = !isMuted;
    ratsSprite.mute(isMuted);
    muteButton.textContent = isMuted ? "un" + originalMuteLabel : originalMuteLabel;
  });
  // Mute the audio the the user leaves the tab.
  document.addEventListener("visibilitychange", () => {
    if (!isMuted) {
      ratsSprite.mute(document.hidden);
    }
  });

  // Allow turning off animations manually.
  function handleReduceMotion (shouldReduce) {
    document.body.classList.toggle("prefers-reduced-motion", shouldReduce);
    if (shouldReduce) {
      reduceMotionButton.dataset.pressed = "true";
      animation.src ="rats-no-motion.gif";
    } else  {
      reduceMotionButton.dataset.pressed = "false";
      animation.src ="rats.gif";
    }
  }

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotionQuery.addEventListener("change", ({ matches }) => {
    handleReduceMotion(matches);
  });
  reduceMotionButton.addEventListener("click", function () {
    handleReduceMotion(reduceMotionButton.dataset.pressed === "false");
  });

  playButton.addEventListener("click", function () {
    handleReduceMotion(reduceMotionQuery.matches);
    ratsSprite.mute(true);

    // Play and pause sprites so we can get their IDs.
    Object.keys(ratsSpriteOptions).forEach((key) => {
      ratsSpriteParts[key] = ratsSprite.play(key);
      ratsSprite.pause(ratsSpriteParts[key]);
    });

    // Start it off
    ratsSprite.mute(false);
    ratsSprite.play(ratsSpriteParts.intro);
    playButton.innerHTML = "Loading...";
    playButton.disabled = true;

    ratsSprite.on(
      "play",
      function () {
        playButton.style.display = "none";
      },
      ratsSpriteParts.intro
    );

    ratsSprite.on("end", playName, ratsSpriteParts.intro);
    ratsSprite.on("end", handlePlayNameEnd, ratsSpriteParts.name);
    ratsSprite.on("end", playName, ratsSpriteParts.cakeAndIcecream);
    ratsSprite.on("end", playIdentity, ratsSpriteParts.suchAGoodBoy);
    ratsSprite.on("end", handlePlayIdentityEnd, ratsSpriteParts.boy);

    ratsSprite.on(
      "end",
      function () {
        // Start a bit at the start to get it on beat.
        ratsSprite.seek(0.3, ratsSpriteParts.intro);
        ratsSprite.play(ratsSpriteParts.intro);
      },
      ratsSpriteParts.thisYearWowWeGonnaCheer
    );
  });

  function handlePlayNameEnd() {
    if (state.firstTry) {
      ratsSprite.play(ratsSpriteParts.cakeAndIcecream);
    } else {
      ratsSprite.play(ratsSpriteParts.suchAGoodBoy);
    }

    state.firstTry = !state.firstTry;
  }

  function handlePlayIdentityEnd() {
    ratsSprite.play(ratsSpriteParts.thisYearWowWeGonnaCheer);
  }

  function playName() {
    if (state.name === DEFAULT_NAME) {
      return ratsSprite.play(ratsSpriteParts.name);
    }

    console.log(ratsSpriteParts.name);

    textToSpeech(state.nameSpeechSynthesis)
      // if it errors fallback to default
      .catch(() => {
        ratsSprite.play(ratsSpriteParts.name);
      })
      .finally(() => {
        handlePlayNameEnd();
      });
  }

  function playIdentity() {
    if (state.identity === DEFAULT_IDENTITY) {
      return ratsSprite.play(ratsSpriteParts.boy);
    }

    textToSpeech(state.identitySpeechSynthesis)
      // if it errors fallback to default
      .catch(() => {
        ratsSprite.play(ratsSpriteParts.boy);
      })
      .finally(() => {
        handlePlayIdentityEnd();
      });
  }
})();
