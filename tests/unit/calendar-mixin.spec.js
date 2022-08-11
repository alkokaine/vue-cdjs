import 'jest'
import { createDate, prevMonthDays, getDays } from '@/common/month-days'

const date = createDate(2022, 8, 1).toDate()

describe('get days', () => {
  // const days = []
  test('В августе 2022 года 31 день', () => {
    const promise = getDays(date)
    .then(result => expect(result.length).toBe(31))
    .catch(reason => Promise.reject(reason))
  })
  test('Все элементы массива принадлежат августу', (done)=> {
    const promise = getDays(date)
    .then(result => {
      const _result = result.every(day => day.date.month() === 7)
      expect(result).toBeTruthy()
      done()
    })
  })
  const feb2020 = createDate(2020, 2, 1).toDate()
  test('В феврале 2020 года 29 дней', (done) => {
    const promise = getDays(feb2020).then(result => {
      expect(result.length).toBe(29)
      done()
    })
  })
  test('остаток июля на первой неделе августа 2022 года -- 0 дней', () => {
    expect(prevMonthDays(date).length).toBe(0)
  })
  test('остаток января на первой неделе февраля 2020 года -- 5 дней', () => {
    expect(prevMonthDays(feb2020).length).toBe(5)
  })
  test('остаток августа на первой неделе сентября 2022 года -- 3 дня', () => {
    expect(prevMonthDays(createDate(2022, 9, 1).toDate()).length).toBe(3)
  })
})
