class SessionsController < ApplicationController

  def create
    raise Exceptions::AlreadyLoggedInError if session[:user_id]
    user = User.find_by(email: session_params[:email])
    raise Exceptions::UnauthorizedError if
    !user || !user.authenticate(session_params[:password])

    session[:user_id] = user.id
    render json: { user_id: user.id }, status: :created
  end

  private

 def session_params
   params.require(:user).permit(:email, :password)
 end
end
