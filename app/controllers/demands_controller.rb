class DemandsController < ApplicationController
  respond_to :json

  def index
    user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
    demands = user.demanding
    render json: { demands: demands }
  end

  def create
    crop = Crop.find_or_create_by_name(params[:demand_crop_name])
    if crop.valid?
      demand = current_user.demands.create(crop: crop)
      if demand.valid?
        render json: { demand: demand }
      else
        render json: { errors: demand.errors }
      end
    else
      render json: {errors: crop.errors }
    end
  end

  def destroy
    Demand.find(params[:id]).destroy
  end
end
