;(function() {
    let drumPad = document.querySelectorAll('.drum-pad')
    let audio = document.querySelectorAll('.clip')
    let showArea = document.querySelector('#display')
    let bankBtn = document.querySelector('#bankBtn')
    let powerBtn = document.querySelector('#powerBtn')
    let volumeBtn = document.querySelector('input[type="range"]')
    let bankNum = 1
    let powerFlag = false
    let data = {
            Q: [
                    { name: 'Heater 1', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
                    { name: 'Chord 1', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' }
            ],
            W: [
                    { name: 'Heater 2', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
                    { name: 'Chord 2', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' }
            ],
            E: [
                    { name: 'Heater 3', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
                    { name: 'Chord 3', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' }
            ],
            A: [
                    { name: 'Heater 4', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
                    {
                            name: 'Give us a light',
                            audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
                    }
            ],
            S: [
                    { name: 'Heater 6', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
                    { name: 'Dry Ohh', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' }
            ],
            D: [
                    { name: 'Dsc Oh', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
                    { name: 'Bld H1', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' }
            ],
            Z: [
                    { name: 'Kick n Hat', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
                    {
                            name: 'punchy kick 1',
                            audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
                    }
            ],
            X: [
                    { name: 'RP4 KICK 1', audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
                    { name: 'side stick 1', audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' }
            ],
            C: [
                    { name: 'Cev H2', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
                    { name: 'Brk Snr', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
            ]
    }
    function clickDrum(key) {
            if (powerFlag) return false
            key = this.querySelector('audio').id
            stopAudio()
            this.classList.add('active')
            showArea.textContent = data[key][bankNum].name
            this.querySelector('audio').play()
            setTimeout(() => {
                    this.classList.remove('active')
            }, 500)
    }

    function keyupHandler(e) {
            switch (e.key.toUpperCase()) {
                    case 'Q':
                            document.querySelector('#drumQ').click()
                            break
                    case 'W':
                            document.querySelector('#drumW').click()
                            break
                    case 'E':
                            document.querySelector('#drumE').click()
                            break
                    case 'A':
                            document.querySelector('#drumA').click()
                            break
                    case 'S':
                            document.querySelector('#drumS').click()
                            break
                    case 'D':
                            document.querySelector('#drumD').click()
                            break
                    case 'Z':
                            document.querySelector('#drumZ').click()
                            break
                    case 'X':
                            document.querySelector('#drumX').click()
                            break
                    case 'C':
                            document.querySelector('#drumC').click()
                            break
                    default:
                            return false
            }
    }

    function switchBtn(e) {
            this.querySelector('.cube').classList.toggle('on')
            let flag = this.querySelector('.cube').classList.contains('on')
            let target = e.target.id === '' ? e.target.parentElement.id : e.target.id
            if (target === 'bankBtn') flag ? (bankNum = 0) : (bankNum = 1)
            if (target === 'powerBtn') {
                    showArea.textContent = ''
                    powerFlag = !powerFlag
            }
            setAudio(bankNum)
    }

    function changeVolume() {
            showArea.textContent = `volume：${Math.floor(this.value * 100)}`
            setVolume(this.value)
    }
    function leaveVolume() {
            showArea.textContent = ''
    }

    function setAudio(idx) {
            document.querySelectorAll('.clip').forEach((item, index) => {
                    item.src = data[item.id][idx].audio
            })
    }

    function stopAudio() {
            audio.forEach(item => {
                    item.pause()
                    item.currentTime = 0
            })
    }

    function setVolume(val) {
            audio.forEach(item => {
                    item.volume = val
            })
    }

    drumPad.forEach(item => item.addEventListener('click', clickDrum))
    bankBtn.addEventListener('click', switchBtn)
    powerBtn.addEventListener('click', switchBtn)
    volumeBtn.addEventListener('change', changeVolume)
    volumeBtn.addEventListener('mousemove', changeVolume)
    volumeBtn.addEventListener('mouseleave', leaveVolume)
    window.addEventListener('keyup', keyupHandler)
    setAudio(bankNum)
})()