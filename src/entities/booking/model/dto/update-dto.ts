import { Room } from "@/entities/room";
import { EBookingStatus, V2_Booking } from "..";
import moment from "moment";
import { IImage } from "@/app/types";

class BookingUpdateDto {
  constructor(
    booking: V2_Booking = {
      id: 0,
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
          link: "",
        },
      },
      capacity: 1,
      check_in: 0,
      check_out: 0,
      rooms: [],
    }
  ) {
    this.id = booking.id;
    this.amount = booking.amount;
    this.status = booking.status;

    if (typeof booking.user === "object") {
      this.user = booking.user.id;
    } else {
      this.user = booking.user;
    }

    this.capacity = booking.capacity || 1;
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
  id: number;
  amount: number;
  status: EBookingStatus;
  user: string;
  capacity: number;
  check_in: number;
  check_out: number;
  rooms: Array<Pick<Room, "id">>;
  avatar: IImage;
}

export { BookingUpdateDto };
