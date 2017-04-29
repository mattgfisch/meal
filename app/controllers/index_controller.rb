class IndexController < ApplicationController
  def index
    render component: 'RegistrationForm'
  end
end
