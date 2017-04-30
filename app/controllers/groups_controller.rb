class GroupsController < ApplicationController
  def show
    @user = User.find(session[:user_id])
    @group = Group.find(params[:id])
    respond_to do |format|
     render json: {name: group.name, }
   end
  end
end
