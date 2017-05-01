class GroupsController < ApplicationController

  def create
    groupName = params[:groupName]
    emails = params[:groupEmails]
    return render json: { errors: "Group name can't be blank" }, status: 400 if groupName == ""

    creator = User.find(session[:user_id])
    group = Group.new(name: groupName)
    
    if emails && groupName
      emails.each do |email|
        user = User.find_by(email: email)
        if user && user != creator
          group.members << user
        else
          return render json: {errors: "Invalid email(s)" }, status: 422
        end
      end
      creator.created_groups << group
      group.save
      group.members << creator
      return render json: { group_id: group.id }
    end
    if groupName
      creator.created_groups << group
      group.save
      group.members << creator
      return render json: { group_id: group.id }
    end
  end

  def show
    group = Group.find(params[:id])
    render json: {groupTitle: group.name, groupMembers: group.members, groupAdminId: group.admin_id }
 end

  def joined_groups
    user = User.find(session[:user_id])
    groups = user.groups
    p groups
    render json: { groups: groups }
  end

  def admin_groups
    user = User.find(session[:user_id])
    admin_groups = user.created_groups
    render json: { admin_groups: admin_groups }
  end
end
