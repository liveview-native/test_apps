class CounterController < ApplicationController
  def index
    @counter = params[:counter].to_i || 0

    respond_to do |format|
      format.html # renders index.html.erb with application.html.erb layout
      format.any(:swiftui_vml) do
        response.content_type = "application/swiftui+vml"
        render :index # will use application.swiftui_vml.erb layout
      end
    end
  end

  def increment
    @counter = params[:counter].to_i + 1

    respond_to do |format|
      format.html do
        render turbo_stream: turbo_stream.replace("counter", partial: "counter", locals: { counter: @counter })
      end
      format.any(:swiftui_vml) do
        response.content_type = "application/swiftui+vml"
        render :increment # will use application.swiftui_vml.erb layout
      end
    end
  end
end
