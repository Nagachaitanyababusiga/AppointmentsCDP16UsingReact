// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {parse, format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    AppointmentList: [],
    title: '',
    date: '',
    StaredDisplay: false,
  }

  updateDate = event => {
    // console.log(typeof event.target.value)
    const value = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date: value})
  }

  updateInput = event => {
    // console.log(event.target.value)
    this.setState({title: event.target.value})
  }

  submitIt = event => {
    event.preventDefault()
    const {AppointmentList, title, date} = this.state
    if (title !== '' && date !== '') {
      const newList = [
        ...AppointmentList,
        {id: uuidv4(), title, date, isStared: false},
      ]
      this.setState({
        AppointmentList: newList,
        title: '',
        date: '',
        // check here
        StaredDisplay: false,
      })
    }
  }

  chageStarStatus = id => {
    const {AppointmentList} = this.state
    const newList = AppointmentList.map(x => {
      if (x.id === id) {
        return {id: x.id, title: x.title, date: x.date, isStared: !x.isStared}
      }
      return x
    })
    this.setState({AppointmentList: newList})
  }

  toggle = () => {
    this.setState(prevState => {
      const {AppointmentList, title, date, StaredDisplay} = prevState
      return {AppointmentList, title, date, StaredDisplay: !StaredDisplay}
    })
  }

  render() {
    const {AppointmentList, title, date, StaredDisplay} = this.state
    const StaredList = AppointmentList.filter(x => x.isStared === true)
    let parsedDate = ''
    if (date !== '')
      parsedDate = format(
        parse(date, 'dd MMMM yyyy, EEEE', new Date()),
        'yyyy-MM-dd',
      )
    return (
      <div className="outer-cont">
        <div className="card">
          <div className="upper-outer-cont">
            <form className="form-cont">
              <h1 className="form-header">Add Appointment</h1>
              <label htmlFor="inputer">TITLE</label>
              <input
                placeholder="TITLE"
                className="input-style"
                id="inputer"
                type="text"
                value={title}
                onChange={this.updateInput}
              />
              <label htmlFor="dater">DATE</label>
              <input
                className="date-style"
                id="dater"
                type="date"
                value={parsedDate}
                onChange={this.updateDate}
              />
              <button
                onClick={this.submitIt}
                className="form-btn"
                type="submit"
              >
                Add
              </button>
            </form>
            <img
              className="imager"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="lower-outer-cont">
            <div className="lower-header-cont">
              <h1>Appointments</h1>
              <button
                className="lower-button"
                type="button"
                onClick={this.toggle}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-cont">
              {StaredDisplay
                ? StaredList.map(x => (
                    <AppointmentItem
                      chageStarStatus={this.chageStarStatus}
                      Details={x}
                      key={x.id}
                    />
                  ))
                : AppointmentList.map(x => (
                    <AppointmentItem
                      chageStarStatus={this.chageStarStatus}
                      Details={x}
                      key={x.id}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
