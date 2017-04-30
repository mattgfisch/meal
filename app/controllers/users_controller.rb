class UsersController < ApplicationController

  def create
    user = User.new(user_params)
      if user.save
        render json: {
          id: user.id,
          name: user.name
        }
      else
        render json: {
          errors: user.errors.messages
        }, status: 400
      end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
