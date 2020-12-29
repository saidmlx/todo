'use strict'
const test = require('ava')
import AppTodo from '../src/js/appTodos' // eslint-disable-line
import statusInterface from '../src/js/statusInterface' // eslint-disable-line

test.before(t => {})

test.beforeEach(t => {})

test('Shouls add a new event', t => {
  const app = new AppTodo()
  app.addTask({ name: 'Complete Javascript course', status: statusInterface.ACTIVE })
  t.truthy((app.list.length > 0 && app.list[0].name === 'Complete Javascript course' && app.list[0].status === 'ACTIVE'), 'Now we can inset tasks')
})

test('Should not insert duplicated todos', t => {
  const app = new AppTodo()
  app.addTask({ name: 'Complete Javascript course', status: statusInterface.ACTIVE })
  app.addTask({ name: 'Complete Javascript course', status: statusInterface.ACTIVE })
  t.is(1, app.list.length, 'the addTask is inserting duplicate values, remember that the description should be unique')
})

test('Should mark task as complete by id', t => {
  const app = new AppTodo()
  app.addTask({ name: 'Complete Javascript course', status: statusInterface.ACTIVE })
  app.addTask({ name: 'Jog around the park 3x', status: statusInterface.ACTIVE })
  app.addTask({ name: '10 minutes meditation', status: statusInterface.ACTIVE })
  const task = app.list[1]
  app.markAsCompleted(task.id)
  const completed = app.list.filter(item => item.status === statusInterface.COMPLETED).length
  t.is(1, completed, ' After to added tree tasks and completed one, should be 1 active')
})

test('Should delete todos from the list', t => {
  const app = new AppTodo()
  app.addTask({ name: 'Complete Javascript course', status: statusInterface.ACTIVE })
  app.addTask({ name: 'Jog around the park 3x', status: statusInterface.ACTIVE })
  app.addTask({ name: '10 minutes meditation', status: statusInterface.ACTIVE })

  const task = app.list[1]
  app.deleteTask(task.id)
  t.is(2, app.list.length, ' After to delete the list values shoul be 2')
})

test('Should filter by all todos', t => {
  const app = new AppTodo()
  const todos = [
    { name: 'Complete Javascript course', status: statusInterface.ACTIVE },
    { name: 'Jog around the park 3x', status: statusInterface.COMPLETED },
    { name: '10 minutes meditation', status: statusInterface.ACTIVE },
    { name: 'Read for one hour', status: statusInterface.ACTIVE }
  ]
  app.addTask(todos[0])
  app.addTask(todos[1])
  app.addTask(todos[2])
  app.addTask(todos[3])
  t.is(4, app.list.length, ' It shoul be exist 4 elements')
})
test('Should filter by active todos', t => {
  const app = new AppTodo()
  const todos = [
    { name: 'Complete Javascript course', status: statusInterface.ACTIVE },
    { name: 'Jog around the park 3x', status: statusInterface.COMPLETED },
    { name: '10 minutes meditation', status: statusInterface.ACTIVE },
    { name: 'Read for one hour', status: statusInterface.ACTIVE }
  ]
  app.addTask(todos[0])
  app.addTask(todos[1])
  app.addTask(todos[2])
  app.addTask(todos[3])
  t.is(3, app.getActived().length, ' It shoul be exist 3 elements')
})

test('Should filter by complete todos', t => {
  const app = new AppTodo()
  const todos = [
    { name: 'Complete Javascript course', status: statusInterface.ACTIVE },
    { name: 'Jog around the park 3x', status: statusInterface.COMPLETED },
    { name: '10 minutes meditation', status: statusInterface.ACTIVE },
    { name: 'Read for one hour', status: statusInterface.COMPLETED }
  ]
  app.addTask(todos[0])
  app.addTask(todos[1])
  app.addTask(todos[2])
  app.addTask(todos[3])
  t.is(2, app.getCompleted().length, ' It shoul be exist 2 elements')
})
test('Should clear all completed todos', t => {
  const app = new AppTodo()
  const todos = [
    { name: 'Complete Javascript course', status: statusInterface.COMPLETED },
    { name: 'Jog around the park 3x', status: statusInterface.ACTIVE },
    { name: '10 minutes meditation', status: statusInterface.ACTIVE },
    { name: 'Read for one hour', status: statusInterface.COMPLETED }
  ]
  app.addTask(todos[0])
  app.addTask(todos[1])
  app.addTask(todos[2])
  app.addTask(todos[3])
  app.clearCompleted()
  t.is(2, app.list.length, ' It shoul be exist 2 elements')
})
