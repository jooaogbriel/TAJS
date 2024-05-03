import { describe, expect, it } from '@jest/globals';
import { mapPerson } from '../src/person.js';

describe('Person Test Suite', () => { 
  describe('happy path', () => {
    it('should map person', () => {
      const personStr = '{"name": "jao", "age": 20}'
      const personObj = mapPerson(personStr)
      expect(personObj).toEqual({
        name: "jao",
        age: 20,
        createdAt: expect.any(Date)
      })
    })
  })

  describe('what covarege doensnt tell you', () => {
    it('should not map person given invalid JSON string', () => {
      const personStr = '{"name":}'
      expect(()=> mapPerson(personStr)).toThrow('Unexpected token } in JSON at position 8')
    })

    it('should not map person given invalid JSON data', () => {
      const personStr = '{}'
      const personObj = mapPerson(personStr)
      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      })
    })
  })
 })