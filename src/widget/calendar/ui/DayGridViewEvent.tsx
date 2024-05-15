import { Button, Typography } from "antd"
import { FC } from "react"

type DayGridViewEventProps = {
    title: string
}

const DayGridViewEvent: FC<DayGridViewEventProps> = ({ title }) => {
    return (
        <Button style={{ overflow: "hidden", width: "100%" }}>
            <Typography.Text ellipsis={true}>
                {title}
            </Typography.Text>
        </Button>
    )
}


export { DayGridViewEvent }