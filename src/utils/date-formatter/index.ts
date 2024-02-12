import moment from "moment-timezone";

class DateFormatter {
  toDatetimeLocal(date: number | undefined) {
    if (date) {
      const datetime_local = new Date(date * 1000).toISOString().slice(0, 16);
      return datetime_local;
    } else {
      return new Date().toISOString().slice(0, 16);
    }
  }

  toDateString(date: number) {
    const dateString = moment(date * 1000)
      .tz("Asia/Krasnoyarsk")
      .toDate()
      .toLocaleDateString();

      return dateString
  }
}

export default DateFormatter;
