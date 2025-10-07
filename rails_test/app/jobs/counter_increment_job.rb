class CounterIncrementJob < ApplicationJob
  queue_as :default

  def perform(counter_value)
    new_counter = counter_value + 1

    Turbo::StreamsChannel.broadcast_replace_to(
      "counter_stream",
      target: "counter",
      partial: "counter/counter",
      locals: { counter: new_counter }
    )

    CounterIncrementJob.set(wait: 1.second).perform_later(new_counter)
  end
end
