class CounterController < ApplicationController
  def index
    @counter = params[:counter].to_i || 0
  end

  def increment
    @counter = params[:counter].to_i + 1
    render turbo_stream: turbo_stream.replace("counter", partial: "counter", locals: { counter: @counter })
  end
end
