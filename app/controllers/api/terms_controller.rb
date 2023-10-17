class Api::TermsController < ApplicationController
  before_action :set_term, only: [:destroy, :show, :update]

  def index
    terms = Term.all.order(created_at: :desc)
    render json: terms, each_serializer: Api::TermSerializer
  end

  def destroy
    @term.destroy
  end

  def show
    render json: @term, each_serializer: Api::TermSerializer
  end

  def create
    term = Term.new(term_params)
    if term.save
      render json: term
    else
      render json:  term.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @term.update(term_params)
      render json: @term
    else
      render json:  @term.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def set_term
    @term = Term.find(params[:id])
  end

  def term_params
    params.require(:term).permit(:id, :name, :term_type)
  end
end
