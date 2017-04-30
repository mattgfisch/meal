class SessionsController < ApplicationController
  def show
    user = User.find(session[:user_id])
    render json: {sessionID: user.id, userName: user.name }
  end

  def create
    user = User.find_by(email: session_params[:email])
    if !user || !user.authenticate(session_params[:password])
      render json: {
        errors: 'Email or Password incorrect'
      }, status: 400
    else
      session[:user_id] = user.id
      render json: { user_id: user.id, user_name: user.name }, status: :created
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'You have been successfully logged out' }
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
