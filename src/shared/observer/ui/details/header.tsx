import { Button, Flex, Typography } from "antd";
import { FC } from "react";

const DetailsPageHeader: FC<any> = ({ heading, onSaveButtonClick, onDeleteButtonClick }) => {
  return (
    <header>
      <Flex
        align="center"
        justify="space-between"
      >
        <Typography.Title>
          {heading}
        </Typography.Title>

        <Flex
          align="center"
          gap={"middle"}>
          <Button
            shape="circle"
            size="large"
            onClick={(e) => onSaveButtonClick(e)}
          />
          <Button
            shape="circle"
            size="large"
            onClick={(e) => onDeleteButtonClick(e)}
          />
        </Flex>
      </Flex>
    </header>
  )
}

export { DetailsPageHeader }