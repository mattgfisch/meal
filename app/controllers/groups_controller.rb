class GroupsController < ApplicationController
  def create
    groupName = params[:groupName]
    emails = params[:groupEmails]
    group = Group.new(name: groupName, admin_id: session[:user_id])
    emails.each do |email|
      user = User.find_by(email: email)
      group.members << user
    end
    if group.save
      render json: { group_id: group.id }
    else
      render json: { errors: group.errors.full_messages }
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
