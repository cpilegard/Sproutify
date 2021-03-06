class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :require_login

  def current_user=(user)
    session[:user_id] = user.id
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !current_user.nil?
  end

  helper_method :current_user, :logged_in?

  private 

  def require_login
    if !logged_in?
      render text: "You are not authorized to do that"
    end
  end
end
