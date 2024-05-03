import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { setTimeout } from 'node:timers/promises';
import Task from '../src/task';

describe('Task Test Suite', () => { 
  let _task
  let _logMock;
  beforeEach(() => {
    _logMock = jest.spyOn(
      console,
      console.log.name
    ).mockImplementation();
    _task = new Task()
  })
  it.skip('should only run tasks that are due whithout fake timers (slow)', async () => {
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      },
    ]
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    await setTimeout(11000) // 11_000
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  },
  15e3
  )

  it('should only run tasks that are due whithout fake timers (fask)', async () => {
    jest.useFakeTimers()
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      },
    ]
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    // ninguem deve ser executado ainda
    jest.advanceTimersByTime(4000)
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

   
    jest.advanceTimersByTime(2000)
     // 4 + 2 = 6 só a 1 tarefa deve ser executada
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)

    // 4+2+6 = 10 segunda tarefa deve ser executada
    expect(tasks.at(1).fn).toHaveBeenCalled()
  },
  15e3
  )
})