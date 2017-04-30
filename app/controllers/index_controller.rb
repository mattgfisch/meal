class IndexController < ApplicationController
  def index
    render component: 'Content'
  end
end
