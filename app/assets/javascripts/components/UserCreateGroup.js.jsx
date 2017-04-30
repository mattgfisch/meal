class UserCreateGroup extends React.Component {

  render () {
    const handleClick = (event) => {
      event.preventDefault()
      this.props.changeMode('CreateGroup')
    }
    return (
      <div className='create-group-btn'>
        <button onClick={handleClick} className='btn btn-default'> + </button>
      </div>
    )
  }
}
