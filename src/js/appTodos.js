import statusInterface from './statusInterface'
import ExceptionTodos from './ExceptionTodos'

class AppTodo {
  constructor () {
    this.list = []
  }

  addTask (item) {
    if (!this.list.map((task) => task.name).includes(item.name)) {
      item.id = this.getRandomArbitrary(100, 999)
      this.list.push(item)
      return item
    } else {
      throw new ExceptionTodos(`The task '${item.name}' is present yet`)
    }
  }

  markAsCompleted (id) {
    const task = this.list.find(item => item.id === id)
    if (task) {
      task.status = statusInterface.COMPLETED
    } else {
      throw new ExceptionTodos(`The id: ${id} not exist `)
    }
  }

  markAsActive (id) {
    const task = this.list.find(item => item.id === id)
    if (task) {
      task.status = statusInterface.ACTIVE
    } else {
      throw new ExceptionTodos(`The id: ${id} not exist `)
    }
  }

  getRandomArbitrary (min, max) {
    return parseInt((Math.random() * (max - min) + min) * 100)
  }

  deleteTask (id) {
    const taskIndex = this.list.findIndex(item => item.id === id)
    if (taskIndex >= 0) {
      this.list.splice(taskIndex, 1)
    } else {
      throw new ExceptionTodos(`The id: ${id} not exist `)
    }
  }

  getActived () {
    return this.list.filter(task => task.status === statusInterface.ACTIVE)
  }

  isCompleted (id) {
    const el = this.list.find(task => task.id === id)
    if (el && el.status === statusInterface.COMPLETED) {
      return true
    } else {
      return false
    }
  }

  getCompleted () {
    return this.list.filter(task => task.status === statusInterface.COMPLETED)
  }

  clearCompleted () {
    for (let i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i].status === statusInterface.COMPLETED) {
        this.list.splice(i, 1)
      }
    }
  }
}

export default AppTodo
