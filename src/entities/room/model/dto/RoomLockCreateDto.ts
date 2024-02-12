import moment from "moment";

class RoomLockCreationDto {
  constructor(
    id: number = 0,
    start: number = Math.floor(moment.now() / 1000),
    end: number = Math.floor(moment.now() / 1000),
    reason: string = "Оффлай заказ"
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.reason = reason;
  }

  id: number;
  start: number;
  end: number;
  reason: string;
}

export { RoomLockCreationDto };
