import moment from 'moment'
import axios from 'axios'

const daysInMonth = (year, month) => (moment(`${year}-${month}-01`, 'YYYY-MM')).daysInMonth()
const createDate = (year, month, day) => (moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'))
const lastMonthDay = (year, month) => (createDate(year, month, daysInMonth(year, month)))
const prevMonthDays = (date) => {
  const prevmonth = (moment(date)).subtract(1, 'month')
  const lastDay = lastMonthDay(prevmonth.year(), prevmonth.month() + 1)
  const days = []
  while (lastDay.day() > 0) {
    days.unshift({ date: moment(lastDay.toDate()), isprev: true })
    lastDay.subtract(1, 'days')
  }
  return days
}

const getDays = (date, options = { pre: 1, covid: 1, sd: 0 }) => {
  const days = []
  const params = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    pre: options.pre,
    covid: options.covid,
    sd: options.sd
  }

  return new Promise((resolve, reject) => {
    axios({
      url: 'https://isdayoff.ru/api/getdata',
      params: params,
      method: 'get'
    }).then(response => {
      days.push(...Array.from(response.request.response)
        .map((m, index) => ({ date: createDate(params.year, params.month, index + 1), code: Number(m) }))
      )
    }).catch(reason => {
      days.push(...Array.from(Array(daysInMonth(params.year, params.month)).keys())
        .map((m, index) => ({ date: createDate(params.year, params.month, index + 1) })))
    }).finally(() => {
      resolve(days)
    })
  })
}

export {
  createDate,
  daysInMonth,
  prevMonthDays,
  getDays
}