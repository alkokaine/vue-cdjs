import moment from 'moment'
import axios from 'axios'

const daysInMonth = (year, month) => (moment(`${year}-${month}-01`, 'YYYY-MM')).daysInMonth()
const createDate = (year, month, day) => (moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'))
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
      try {
        const prevmonth = (moment(date)).subtract(1, 'month')
        const _prepend = []
        const prevmonth_year = prevmonth.year()
        const prevmonth_month = prevmonth.month() > 10 ? prevmonth.month() + 1 : `0${prevmonth.month() + 1}`
        const prevmonth_days = daysInMonth(prevmonth_year, prevmonth_month)
        const _lastDay = createDate(prevmonth_year, prevmonth_month, prevmonth_days)
        while (_lastDay.day() !== 1) {
          _prepend.unshift({ date: _lastDay, isprev: true})
          _lastDay.subtract(1, 'days')
        }
        // const fd = createDate(params.year, params.month, days[0].date.getDay())
        // const dayOfWeek = fd.day()
        // if (dayOfWeek === 1) resolve(days)
        // let ln = dayOfWeek - 1
        // const result = []
        // while (ln > 0) {
        //   const d = fd.subtract(1, 'days')
        //   result.unshift({ date: d, isprev: true })
        //   ln -= 1
        // }
        return resolve(_prepend.concat(days))
      }
      catch (err) {
        return reject(err)
      }
    })
  })
}

export {
  createDate,
  daysInMonth,
  getDays
}