class UserContent extends React.Component {

  constructor () {
    super()
  }

  render(){
    const createGroup = () => {
      this.props.changeMode('CreateGroup')
    }
    return(
      <div>
        <h2>Your Meals</h2>
        <button onClick={createGroup}>Create Group</button>
      </div>)
  }
}
