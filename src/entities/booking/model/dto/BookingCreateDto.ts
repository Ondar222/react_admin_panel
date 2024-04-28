import { Room } from "@/entities";
import { EBookingStatus, Booking } from "..";
import moment from "moment";

class BookingCreateDto {
  constructor(
    booking: Omit<Booking, "id"> = {
      amount: 0,
      status: EBookingStatus.draft,
      user: {
        id: "",
        name: "",
        surname: "",
        phone: "",
        email: "",
        avatar: {
          id: "",
          link: ""
        }
      },
      capacity: 1,
      check_in: Date.now() / 1000,
      check_out: Date.now() / 1000,
      rooms: [],
    }
  ) {
    this.amount = booking.amount;
    this.status = booking.status;
    if (typeof booking.user === "object") {
      this.user = booking.user.id
    }
    else {
      this.user = booking.user
    }
    this.capacity = booking.capacity;
    this.check_in = moment(booking.check_in).isValid()
      ? booking.check_in
      : Date.now();
    this.check_out = moment(booking.check_out).isValid()
      ? booking.check_out
      : Date.now();
    this.rooms = booking.rooms.map((room) => {
      return {
        id: room.id,
      };
    });
  }

  amount: number;
  status: EBookingStatus;
  user: string;
  capacity: number;
  check_in: number;
  check_out: number;
  rooms: Array<Pick<Room, "id">>;
}

export { BookingCreateDto };
