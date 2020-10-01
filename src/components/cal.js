import React from "react";
import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@material-ui/icons';
class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObj: moment(),
      weekdays: moment.weekdaysShort(),
      year: moment().format('Y'),
      daysInMonth: moment().daysInMonth(),
      currentMonth: moment().month(),
      monthArr: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      daysArray: [],
      weeksArr: [],
      startOfMonth: moment().startOf('month').format('YYYY-MM-DD hh:mm'),
      firstDay: moment(moment())
        .startOf("month")
        .format("d"),
      tableRows: [],
      currentDay: moment().format("D"),
    }
  }
  componentDidMount() {
    let blanks = [];
    console.log(this.state.firstDay)
    for (let i = 0; i < this.state.firstDay; i++) {
      blanks.push(<TableCell >{""}</TableCell>)
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.state.daysInMonth; d++) {
      daysInMonth.push(
        <TableCell key={d}>
          <span>
            {d}
          </span>
        </TableCell>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    console.log(totalSlots)
    let tableRows = [];
    let tableCells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        tableCells.push(row);
      } else {
        tableRows.push(tableCells);
        tableCells = [];
        tableCells.push(row);
      }
      if (i === totalSlots.length - 1) {
        tableRows.push(tableCells);
      }
    });
    this.setState({ tableRows })

  }
  nextMonth() {
    if (this.state.currentMonth === 11) {
      this.setState({ currentMonth: 0 })
      console.log(1, "-->", this.state.currentMonth)
    } else {
      this.setState({ currentMonth: (this.state.currentMonth) + 1, dateObj: this.state.dateObj.add(1, "month") })
      console.log(2, "-->", this.state.currentMonth + 1,)
    }
  }
  prevMonth() {
    if (this.state.currentMonth === 0) {
      this.setState({ currentMonth: 11 })
    } else {
      this.setState({ currentMonth: (this.state.currentMonth) - 1 })
    }
    console.log(this.state.currentMonth)
  }
  render() {
    const { weekdays, currentMonth, monthArr } = this.state
    return (
      <div>
        <IconButton onClick={() => this.prevMonth()}><KeyboardArrowLeftOutlined /></IconButton>
        <IconButton onClick={() => this.nextMonth()}><KeyboardArrowRightOutlined /></IconButton>
        <div>{monthArr[currentMonth]}</div>
        <div>{this.state.year}</div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>

                {/* Weekdays */}
                {
                  weekdays.map(day => {
                    return <TableCell>{day}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.tableRows.map((d, i) => {
                  return <TableRow>{d}</TableRow>;
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
export default Cal;