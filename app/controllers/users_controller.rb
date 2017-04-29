class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    begin
      user.save!
      render json: {
        id: user.id,
        name: user.name
      }
    rescue ActiveRecord::RecordNotUnique
      raise Exceptions::UserExistsError.new(message:
      "#{user_params[:name]} already exists in the database, pick another name")
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
