// on load
(function(){

    var name = decodeURIComponent(window.location.hash.slice(1)) || 'michael';

    var ratsIntro = document.getElementById('ratsIntro'),
        ratsName = document.getElementById('ratsName'),
        ratsCakeAndIcecream = document.getElementById('ratsCakeAndIcecream'),
        ratsSuchAGoodBoy = document.getElementById('ratsSuchAGoodBoy');

    var ratsInput = document.querySelector('input'),
        ratsButton = document.querySelector('button');

    var firstTryTho = true;

    ratsInput.addEventListener('change', setName);
    ratsInput.addEventListener('keyup', setName);

    ratsInput.value = name;
    window.document.title = name + ' it\'s your birthday today';
    setNameAudio();

    if ( window.innerWidth < 450 ){
        ratsButton.style.display = 'block';
    } else {
        ratsIntro.play();
    }

    ratsButton.addEventListener('click', function(){
        ratsIntro.play();

        ratsName.play();
        ratsName.pause();

        ratsCakeAndIcecream.play();
        ratsCakeAndIcecream.pause();

        ratsSuchAGoodBoy.play();
        ratsSuchAGoodBoy.pause();

        ratsButton.innerHTML = 'loading...';
        ratsButton.disabled = true;
    });

    ratsIntro.addEventListener('playing', function(){
        ratsButton.style.opacity = '0';
        ratsButton.style.transofrm = 'scale(0)';
    });

    ratsIntro.addEventListener('ended', function(){
        ratsName.play();
    });

    ratsName.addEventListener('ended', function(){
        setNameAudio();

        if(firstTryTho){
            ratsCakeAndIcecream.play();
        } else {
            ratsSuchAGoodBoy.play();
        }
        firstTryTho = !firstTryTho;
    });

    ratsCakeAndIcecream.addEventListener('ended', function(){
        ratsName.play();
    });

    ratsSuchAGoodBoy.addEventListener('ended', function(){
        ratsIntro.play();
    });

    function autoplayTest(callback){

        // Audio file data URIs
        var mp3 = 'data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
        var ogg = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=';

        try {

            var audio = new Audio();
            var src = audio.canPlayType('audio/ogg') ? ogg : mp3;
            audio.autoplay = true;
            audio.volume = 0;

            // this will only be triggered if autoplay works
            audio.addEventListener('play', function(){
                console.log('autoplay works');
                callback(true);
            });

            audio.src = src;

        } catch(e) {
            console.log('[AUTOPLAY-ERROR]', e);
            callback(false);
        }

    }

    function setName(){
        name = ratsInput.value;
        window.location.hash = encodeURIComponent(name);
    }

    function setNameAudio(){
        name = ratsInput.value;

        if( name === '' ){
            name = 'michael';
        }

        var voices = [
            'usenglishfemale',
            'usenglishfemale2',
            'usenglishmale',
            'usenglishmale2',
            'ukenglishfemale',
            'ukenglishfemale2',
            'ukenglishmale',
            'auenglishfemale',
            'usspanishfemale',
            'usspanishmale',
            'chchinesefemale',
            'hkchinesefemale',
            'jpjapanesefemale',
            'krkoreanfemale',
            'caenglishfemale',
            'huhungarianfemale',
            'brportuguesefemale',
            'eurportuguesefemale',
            'eurportuguesemale',
            'eurspanishfemale',
            'eurspanishmale',
            'eurcatalanfemale',
            'eurczechfemale',
            'eurdanishfemale',
            'eurfinnishfemale',
            'eurfrenchfemale',
            'eurfrenchmale',
            'eurnorwegianfemale',
            'eurdutchfemale',
            'eurpolishfemale',
            'euritalianfemale',
            'euritalianmale',
            'eurturkishfemale',
            'eurturkishmale',
            'eurgreekfemale',
            'eurgermanfemale',
            'eurgermanmale',
            'rurussianfemale',
            'rurussianmale',
            'swswedishfemale',
            'cafrenchfemale',
            'cafrenchmale'
        ],
        voice = voices[3],
        speed = 0,
        pitch = 0,
        apiKey = '34b06ef0ba220c09a817fe7924575123';

        if( name.indexOf("😽") !== -1  ){
            voice = 'jpjapanesefemale';
            speed = -10;
            pitch = 150;
        }

        // G'day mate
        if( name.indexOf("🐨") !== -1 ){
            voice = 'auenglishfemale';
        }

        var newSrc = 'https://api.ispeech.org/api/rest' +
                     '?apikey=' + apiKey +
                     '&action=convert' +
                     '&voice=' + voice +
                     '&speed=' + speed +
                     '&pitch=' + pitch +
                     '&text=' + name;

        if(newSrc === ratsName.src){
            return;
        }
        ratsName.src = newSrc;
        ratsName.playbackRate = 1.5;
    }

    function getRandomIntInclusive(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})();
