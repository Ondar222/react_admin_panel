import { FC } from "react"
import DetailForm from "../../../../shared/components/details/ui/form"
// import { default as Booking } from "../../model/interface"

const BookingDetails: FC = (props) => {
  return (

    <DetailForm data={props} />

  )
}

export default BookingDetails