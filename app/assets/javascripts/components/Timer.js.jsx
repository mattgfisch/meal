class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timeout: (this.props.createdAt + 10 * 60 * 1000)
    }
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  tick () {
    this.setState({count: (this.state.count - 1)})
  }
  convertTime () {
    var currentTime = new Date().toString()
    debugger
    var timeLeft = this.state.timeout
    var mins = timeLeft / 60000
    mins = Math.round(mins)
    if(timeLeft <= 0){
      this.stopTimer()
    }
    return (
      <div>
        {mins} minutes till lockout
      </div>
    )
  }

  startTimer () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  stopTimer () {
    clearInterval(this.timer)
  }
  render () {
    debugger
    return (
      <div className='timer'>
        <h1>{this.convertTime()}</h1>
        {this.startTimer()}
        <div>
          <button onClick={this.stopTimer.bind(this)}>Stop</button>
        </div>
      </div>
    )
  }
}
