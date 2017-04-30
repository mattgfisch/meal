class SessionsController < ApplicationController
  def show
    session[:user_id] = User.find_by(name: "Matt").id
    render json: {sessionID: session[:user_id]}
  end
  
  def create
    raise Exceptions::AlreadyLoggedInError if session[:user_id]
    user = User.find_by(email: session_params[:email])
    if !user || !user.authenticate(session_params[:password])
      render json: {
        errors: 'Email or Password incorrect'
      }, status: 400
    else
      session[:user_id] = user.id
      render json: { user_id: user.id }, status: :created
    end
  end

  def destroy
    session.clear
    render json: { message: 'You have been successfully logged out' }
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
