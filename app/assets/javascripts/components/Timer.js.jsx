class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {count: 600}
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  tick () {
    this.setState({count: (this.state.count - 1)})
  }
  convertTime(){
    var total = this.state.count
    var sec = total%60
    total = total - sec
    var mins = total/ 60
    mins = Math.round(mins)
   if(sec <= 9){
     sec = "0" + parseInt(sec,10)
   }
   if(mins <= 9){
     mins = "0" + parseInt(mins,10)
   }
    if(mins == 0 && sec == 0){
      this.stopTimer()
      this.resetTimer()
    }
    return (
      <div>
        {mins} : {sec}
      </div>
    )
  }

  resetTimer () {
    this.state.count = 600
  }
  startTimer () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  stopTimer () {
    clearInterval(this.timer)
  }
  render () {
    return (
      <div className='timer'>
        <h1>{this.convertTime()}</h1>
        <div>
          <button onClick={this.startTimer.bind(this)}>Start</button>
          <button onClick={this.stopTimer.bind(this)}>Stop</button>
        </div>
      </div>
    )
  }
}
