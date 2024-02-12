import Hotel from "../model/interface";

interface IUseHotel {
  hotel: Hotel;
  currentHotel: Hotel | undefined;
  relatedHotels: Hotel | undefined;

  setHotels: () => void;
  setCurrentHotel: () => void;

  updateCurrentHotel: () => void;
  createHotel: () => void;
}

export type { IUseHotel };
