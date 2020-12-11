import AppTodo from './appTodos'
import statusInterface from './statusInterface'

class RenderTodos extends AppTodo {
  constructor () {
    super()
    document.querySelector('button.action-style').addEventListener('click', this.changeStyle)
    document.querySelector('input').addEventListener('keyup', this.inputKeyPress.bind(this))

    document.querySelector('button.btn-all').addEventListener('click', this.showAll.bind(this))
    document.querySelector('button.btn-active').addEventListener('click', this.showActive.bind(this))
    document.querySelector('button.btn-completed').addEventListener('click', this.showComplete.bind(this))
    document.querySelector('button.btn-clear-completed').addEventListener('click', this.clearComplete.bind(this))

    this.add('Complete Javascript course')
    this.add('Jog around the park 3x')
    this.add('10 minutes meditation')
    this.add('Read for one hour')
    this.add('Pick up groceries')
    this.add('Complete Todo APP for frontend mentor')
  }

  changeStyle () {
    const el = document.querySelector('main')
    if (el.classList.contains('dark')) {
      el.classList.remove('dark')
    } else {
      el.classList.add('dark')
    }
  }

  inputKeyPress (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault()
      this.add(evt.target.value)
    }
  }

  add (name) {
    try {
      this.addRenderItem(this.addTask({ name: name, status: statusInterface.ACTIVE }))
    } catch (err) {
      console.log(err)
    }
    this.setstatus()
  }

  addRenderItem (item) {
    const el = document.querySelector('.tasks')
    const task = document.createElement('div')
    task.classList.add('task')
    task.classList.add('box')
    task.classList.add('active')
    task.setAttribute('rowid', item.id)
    const btn = document.createElement('button')
    btn.classList.add('circle')
    btn.classList.add('left')
    const ii = document.createElement('i')
    btn.appendChild(ii)
    const btnClose = document.createElement('button')
    btnClose.classList.add('circle')
    btnClose.classList.add('right')
    const iii = document.createElement('i')
    btnClose.appendChild(iii)
    const p = document.createElement('p')
    p.innerText = item.name
    el.appendChild(task)
    task.appendChild(btn)
    task.appendChild(p)
    task.appendChild(btnClose)
    btn.addEventListener('click', this.setCompleted.bind(this, item.id))
    btnClose.addEventListener('click', this.deleteRow.bind(this, item.id))
  }

  setCompleted (id, evt) {
    if (this.isCompleted(id)) {
      this.markAsActive(id)
      document.querySelector(`[rowid="${id}"] `).classList.remove('completed')
      document.querySelector(`[rowid="${id}"] `).classList.add('active')
    } else {
      this.markAsCompleted(id)
      document.querySelector(`[rowid="${id}"] `).classList.add('completed')
      document.querySelector(`[rowid="${id}"] `).classList.remove('active')
    }
    this.setstatus()
  }

  deleteRow (id) {
    this.deleteTask(id)
    document.querySelector(`[rowid="${id}"] `).remove()
    this.setstatus()
  }

  clearComplete (id) {
    this.getCompleted().forEach(item => this.deleteRow(item.id))
  }

  setstatus () {
    const actives = this.list.reduce((acum, current) => {return current.status === statusInterface.ACTIVE ? acum + 1 : acum }, 0)
    document.querySelector('.btn-items-left').innerText = `${actives} items left`
  }

  showActive () {
    document.querySelectorAll('.actions button').forEach(el => el.classList.remove('active'))
    document.querySelector('.actions button.btn-active').classList.add('active')
    document.querySelectorAll('.task').forEach(el => {
      el.classList.remove('disabled')
      el.classList.add('disabled')
    })
    document.querySelectorAll('.task.active').forEach(el => el.classList.remove('disabled'))
  }

  showComplete () {
    document.querySelectorAll('.actions button').forEach(el => el.classList.remove('active'))
    document.querySelector('.actions button.btn-completed').classList.add('active')
    document.querySelectorAll('.task').forEach(el => {
      el.classList.remove('disabled')
      el.classList.add('disabled')
    })
    document.querySelectorAll('.task.completed').forEach(el => el.classList.remove('disabled'))
  }

  showAll () {
    document.querySelectorAll('.actions button').forEach(el => el.classList.remove('active'))
    document.querySelector('.actions button.btn-all').classList.add('active')
    document.querySelectorAll('.task').forEach(el => el.classList.remove('disabled'))
  }
}

export default RenderTodos
