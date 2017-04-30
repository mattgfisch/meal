class GroupsController < ApplicationController
  def show
    @user = User.find(session[:user_id])
    @group = Group.find(params[:id])
    respond_to do |format|
     render json: {name: group.name }
   end
 end
  def joined_groups
    user = User.find(session[:user_id])
    groups = user.groups
    render json: { groups: groups }
  end

  def admin_groups
    user = User.find(session[:user_id])
    admin_groups = user.created_groups
    render json: { admin_groups: admin_groups }
  end
end
