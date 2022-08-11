import 'jest'
import { createDate, daysInMonth, getDays } from '@/common/month-days'

const date = createDate(2022, 8, 1).toDate()
const promise = getDays(date)

describe('get days', () => {

  // const days = []
  test('В августе 2022 года 31 день', () => {
    const promise = getDays(date)
    .then(result => expect(result.length).toBe(31))
    .catch(reason => Promise.reject(reason))
  })
  test('Все элементы массива принадлежат августу', ()=> {
    const promise = getDays(date)
    .then(result => {
      const _result = result.every(day => day.date.month() === 8)
      expect(result).toBeTruthy()
    })
  })
  const feb2020 = createDate(2020, 2, 1).toDate()
  test('В феврале 2020 года 29 дней', () => {
    const promise = getDays(feb2020).then(result => {
      const _result = result.filter(day => day.date.getMonth() === 2);
      expect(_result.length).toBe(29)
    })
  })
})
