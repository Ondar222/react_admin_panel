import { convertToMoneyString } from "@/shared/utils/converters/toMoney";
import { Input, InputProps } from "antd"
import { FC, useState } from "react"

const MoneyInput: FC<InputProps> = ({ value, onChange, ...otherProps }) => {
    const [type, setType] = useState<"string" | "number">("string")
    const [money, setMoney] = useState<InputProps["value"]>(convertToMoneyString(Number(value)))

    const handleBlur: InputProps["onBlur"] = (e) => {
        setType('string')
        setMoney(convertToMoneyString(Number(e.target.value) * 100))
    }

    const handleFocus: InputProps["onFocus"] = (e) => {
        setType('number')

        const numericValue = parseFloat(e.target.value
            .replace(/[^\d.,]/g, '')
            .replace(/,/, '.')
        );
        setMoney(numericValue)
    }

    const handleChange: InputProps["onChange"] = (e) => {
        setMoney(Number(e.target.value))
        onChange(e)
    }

    return <Input
        type={type}
        value={money}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...otherProps}
    />
}

export { MoneyInput }