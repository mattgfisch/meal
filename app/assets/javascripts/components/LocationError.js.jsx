class LocationError extends React.Component {
  render () {
    if (this.props.locationError) {
      return (
        <div id='location-error' className='alert alert-warning alert-dismissible' role='alert'>
          <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
          <p><strong>Warning!</strong></p> {this.props.locationError}.
        </div>
      )
    }
    return null
  }
}
