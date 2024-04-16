import { FC } from "react"
import { RangePickerUI } from "./ui";
import { RangePickerPresenter } from "./presenter";
import { IRangePicker } from "./model";

const YurtaDatePicker: FC<IRangePicker> = (props) => {
  const { value, defaultValue, onChange, locale } = RangePickerPresenter(props)

  return (
    <RangePickerUI
      value={value}
      defaultValue={value}
      onChange={onChange}
      locale={locale} />
  )
}

export { YurtaDatePicker }