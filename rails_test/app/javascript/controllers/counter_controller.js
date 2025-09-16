import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { counter: Number }
  
  connect() {
    this.counterValue = this.counterValue || 0
    this.startIncrementing()
  }
  
  disconnect() {
    this.stopIncrementing()
  }
  
  startIncrementing() {
    this.timer = setInterval(() => {
      this.counterValue++
      this.updateDisplay()
    }, 1000)
  }
  
  stopIncrementing() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  
  updateDisplay() {
    this.element.querySelector('.counter-display').textContent = this.counterValue
  }
}