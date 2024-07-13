import './index.css'

const AppointmentItem = props => {
  const {Details, chageStarStatus} = props
  const {title, date, id, isStared} = Details

  const star = () => {
    chageStarStatus(id)
  }

  // console.log(isStared)
  return (
    <li className="lst-itm-cont">
      <div className="li-itm-header">
        <p>{title}</p>
        {isStared ? (
          <button
            id="btn-1"
            className="lst-itm-button"
            type="button"
            aria-label="Star appointment"
            onClick={star}
            data-testid="star"
          >
            <img
              className="star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          </button>
        ) : (
          <button
            className="lst-itm-button"
            type="button"
            aria-label="Unstar appointment"
            onClick={star}
            data-testid="star"
          >
            <img
              className="star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          </button>
        )}
      </div>
      <p>{date.toString()}</p>
    </li>
  )
}

export default AppointmentItem
