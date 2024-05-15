import { Roomlock } from "../model";
import { RoomlockStatus } from "../model/Roomlock";

// TODO: потом вынести в отдельную функцию в shared
const RoomlockReasonDecode = (reason: RoomlockStatus) => {
    switch (reason) {
        case RoomlockStatus.OFFLINE:
            return "Оффлайн бронь"
        case RoomlockStatus.REPAIR:
            return "Ремонт"
        case RoomlockStatus.OTHER:
            return "Другая причина"
    }
}

export { RoomlockReasonDecode }