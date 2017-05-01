class GroupsController < ApplicationController
  def show
    group = Group.find(params[:id])
    render json: {groupTitle: group.name, groupMembers: group.members, groupAdminId: group.admin_id }
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
