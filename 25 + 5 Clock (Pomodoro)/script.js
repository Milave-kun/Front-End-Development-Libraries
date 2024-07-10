const audio = document.getElementById('beep');

class App {
  constructor() {
    this.state = {
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false
    };
    this.loop = undefined;
    this.render();
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause() {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });

      this.loop = setInterval(() => {
        const { clockCount, currentTimer, breakCount, sessionCount } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
            clockCount: currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60
          });

          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
  }

  handleReset() {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false
    });

    clearInterval(this.loop);

    audio.pause();
    audio.currentTime = 0;
  }

  convertToTime(count) {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }

  handleLengthChange(count, timerType) {
    const { sessionCount, breakCount, isPlaying, currentTimer } = this.state;

    let newCount;

    if (timerType === 'session') {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }

    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}Count`]: newCount
      });

      if (currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60
        });
      }
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer, isPlaying } = this.state;

    const appHtml = `
      <div>
        <div class="flex">
          ${SetTimer('break', breakCount)}
          ${SetTimer('session', sessionCount)}
        </div>
          
        <div class="clock-container">
          <h1 id="timer-label">${currentTimer}</h1>
          <span id="time-left">${this.convertToTime(clockCount)}</span>
          
          <div class="flex">
            <button id="start_stop" onclick="app.handlePlayPause()">
              ${isPlaying ? 'Pause' : 'Start'}
            </button>
            <button id="reset" onclick="app.handleReset()">
              Reset
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').innerHTML = appHtml;
  }
}

function SetTimer(timerType, count) {
  return `
    <div class="timer-container">
      <h2 id="${timerType}-label">
        ${timerType.charAt(0).toUpperCase() + timerType.slice(1)} Length
      </h2>
      <div class="flex actions-wrapper">
        <button id="${timerType}-decrement" onclick="app.handleLengthChange(-1, '${timerType}')">
          -
        </button>
        <span id="${timerType}-length">${count}</span>
        <button id="${timerType}-increment" onclick="app.handleLengthChange(1, '${timerType}')">
          +
        </button>
      </div>
    </div>
  `;
}

const app = new App();
