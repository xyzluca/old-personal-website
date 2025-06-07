import { describe, it, expect } from 'vitest'
import { formatDate } from '../app/blog/utils'

describe('formatDate', () => {
  it('formats full date without relative info', () => {
    const date = '2024-01-01'
    const result = formatDate(date)
    expect(result).toBe('January 1, 2024')
  })

  it('formats full date with relative info', () => {
    const currentYear = new Date().getFullYear()
    const date = `${currentYear + 1}-01-01`
    const result = formatDate(date, true)
    expect(result).toMatch('January 1')
    expect(result).toMatch('in')
  })

  it('handles dates with time component', () => {
    const date = '2024-03-15T12:34:56'
    const result = formatDate(date)
    expect(result).toBe('March 15, 2024')
  })
})
