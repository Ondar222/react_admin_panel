import { HotelUpdateDto } from "../model/dto/update.dto";
import Hotel from "../model/interface";

interface IUseHotel {
  hotel: Hotel | undefined;

  setHotel: () => void;

  createHotel: () => void;
  updateHotel: (dto: HotelUpdateDto) => Promise<void>;
  deleteHotel: () => void;
}

export type { IUseHotel };
