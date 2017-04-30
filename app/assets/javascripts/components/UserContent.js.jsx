class UserContent extends React.Component {

  render () {
    const createGroup = () => {
      this.props.changeMode('CreateGroup')
    }
    return (
      <div>
        <h2>Your Meals</h2>
        <button className='btn btn-default' onClick={createGroup}>Create Group</button>
      </div>)
  }
}
