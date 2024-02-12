import { PlusIcon } from "@/assets/icons/plus";
import { SaveIcon } from "@/assets/icons/save";
import { IconButton } from "@/shared/components/button/action-buttons";
import { Button, Flex, Input, Typography } from "antd";
import { FC } from "react";

interface IDetailsHeader {
    title: string


    onSearch?: () => void;
    onCreateButtonClick?: () => void;
    onSave?: () => void;
}

const DetailsHeader: FC<IDetailsHeader> = ({
    title,

    onSearch,
    onCreateButtonClick,
    onSave }) => {

    return (
        <Flex justify="space-between">
            <Typography.Title
                level={2}
                style={{ color: "black" }}
                unselectable="on"
            >
                {title}
            </Typography.Title>

            <Flex gap={"middle"}>
                {
                    onSearch &&
                    <Input placeholder="Поиск" />
                }

                {
                    onCreateButtonClick && (
                        <IconButton
                            icon={PlusIcon}
                            onClick={onCreateButtonClick}
                        />
                    )
                }

                {
                    onSave && (
                        <IconButton
                            icon={SaveIcon}
                            onClick={onSave} 
                        />
                    )
                }
            </Flex>
        </Flex>
    )
}

export { DetailsHeader }