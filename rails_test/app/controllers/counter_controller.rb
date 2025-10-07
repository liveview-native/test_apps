class CounterController < ApplicationController
  def index
    @counter = 0
    CounterIncrementJob.perform_later(@counter)

    respond_to do |format|
      format.html
      format.any(:swiftui_vml) do
        response.content_type = "application/swiftui+vml"
        render :index
      end
    end
  end
end
