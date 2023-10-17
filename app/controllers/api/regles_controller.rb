class Api::ReglesController < ApplicationController
  before_action :set_regle, only: [:destroy, :show, :update]

  def index
    regles = Regle.all.order(created_at: :desc)
    render json: regles, each_serializer: Api::RegleSerializer
  end

  def destroy
    @regle.destroy
  end

  def show
    render json: @regle.json_format
  end

  def create
    regle = Regle.create_resource(regle_params)
    if regle
      render json: regle
    else
      render json:  {error:'regle not created'}, status: :unprocessable_entity
    end
  end

  def update
    if @regle.update_resource(regle_params)
      render json: @regle
    else
      render json:  @regle.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def set_regle
    @regle = Regle.find(params[:id])
  end

  def regle_params
    params.require(:regle).permit(:id, :name, hierarchy: {})
  end
end
