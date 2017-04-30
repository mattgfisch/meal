class UserContent extends React.Component {


  handleClick(e){
    e.preventDefault()
    $.ajax ({
      url: '/groups/1',
      type: 'GET',
    }).done(function(response){
      console.log(response)
    })
  }
  render(){
    return(
      <div>
        <h2>Your Meals</h2>
        <div>
           <a href={'#'} onClick={this.handleClick}>Your group</a>
        </div>
      </div>
    )
  }
}
