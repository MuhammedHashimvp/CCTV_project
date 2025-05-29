import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { graphget } from '../Api/Allapi'

function Behaviour() {
  const [rawData, setRawData] = useState([])
  const [groupedByDate, setGroupedByDate] = useState([])
  const [groupedByMonth, setGroupedByMonth] = useState({})
  const [selectedMonth, setSelectedMonth] = useState('')
  const [attendanceData, setAttendanceData] = useState([])
  const [average, setAverage] = useState(0)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    const header = {
      "content-type": "application/json",
      authorization: `token ${sessionStorage.getItem("token")}`,
    }

    graphget(header)
      .then(response => {
        const records = response.data || []
        const json = records
          .filter(entry => entry.Action === 'Attendance')
          .map(entry => ({
            date: entry.Date,
            attendance: entry.Data
          }))
          

        const grouped = {}
        const byDate = {}

        json.forEach(entry => {
          const [year, month, day] = entry.date.split('-')
          const key = `${year}-${month}`

          // By Month (for dropdown)
          if (!grouped[key]) grouped[key] = {}
          if (!grouped[key][entry.date]) {
            grouped[key][entry.date] = { date: entry.date, day, total: entry.attendance, count: 1 }
          } else {
            grouped[key][entry.date].total += entry.attendance
            grouped[key][entry.date].count += 1
          }

          // By Date (for range filtering)
          if (!byDate[entry.date]) {
            byDate[entry.date] = { date: entry.date, day, total: entry.attendance, count: 1 }
          } else {
            byDate[entry.date].total += entry.attendance
            byDate[entry.date].count += 1
          }
        })

        const monthProcessed = {}
        Object.keys(grouped).forEach(monthKey => {
          monthProcessed[monthKey] = Object.values(grouped[monthKey]).map(e => ({
            date: e.date,
            day: e.day,
            attendance: Math.round(e.total / e.count)
          }))
        })

        const allDates = Object.values(byDate).map(e => ({
          date: e.date,
          day: e.date.split('-')[2],
          attendance: Math.round(e.total / e.count)
        }))

        allDates.sort((a, b) => a.date.localeCompare(b.date))

        setRawData(json)
        setGroupedByMonth(monthProcessed)
        setGroupedByDate(allDates)

        const currentMonth = Object.keys(monthProcessed)[0]
        setSelectedMonth(currentMonth)

        // Ensure sorted data
        const sortedData = [...monthProcessed[currentMonth]].sort((a, b) => a.date.localeCompare(b.date))
        setAttendanceData(sortedData)
        setAverage(calcAverage(sortedData))
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, [])

  useEffect(() => {
    let data = []

    if (fromDate && toDate) {
      data = groupedByDate.filter(d => d.date >= fromDate && d.date <= toDate)
    } else if (groupedByMonth[selectedMonth]) {
      data = groupedByMonth[selectedMonth]
    }

    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date))
    setAttendanceData(sorted)
    setAverage(calcAverage(sorted))
  }, [selectedMonth, groupedByMonth, fromDate, toDate, groupedByDate])

  const calcAverage = (arr) => {
    if (!arr || arr.length === 0) return 0
    const total = arr.reduce((acc, cur) => acc + cur.attendance, 0)
    return (total / arr.length).toFixed(1)
  }

  return (
    <>
      <Navbar />
      <div className="p-4 container bg-light">
        <select
          value={selectedMonth}
          onChange={e => {
            setSelectedMonth(e.target.value)
            setFromDate('')
            setToDate('')
          }}
          className="mb-3 p-2 form-control"
        >
          {Object.keys(groupedByMonth).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <div className="mb-3 d-flex gap-3 align-items-center">
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="form-control" />
          <span>to</span>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="form-control" />
        </div>

        <h5>Average Attendance: {average}%</h5>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => dateStr.split('-')[2]} // Show only day
            />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              labelFormatter={(label) => {
                const [year, month, day] = label.split('-')
                return `${day}/${month}/${year}`
              }}
            />
            <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Behaviour
