import { EBookingStatus } from "../model";

const BookingStatusDecode = (status: EBookingStatus) => {
    switch (status) {
        case EBookingStatus.draft:
            return "Черновик";
        case EBookingStatus.paid:
            return "Оплачено";
        case EBookingStatus.rejected:
            return "Отказано"
    }
}

export { BookingStatusDecode }