import { Button, ButtonProps } from "antd"
import Icon from "@ant-design/icons"
import { ComponentType, FC, ForwardRefExoticComponent, SVGProps } from "react"
import styled from "styled-components"
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"

interface IIconButton extends Omit<ButtonProps, "icon" | "children"> {
  icon: ComponentType<SVGProps<SVGSVGElement> | CustomIconComponentProps> | ForwardRefExoticComponent<CustomIconComponentProps> | undefined
}

export const StyledIconButton = styled(Button)`
  color: white;

  background-size: 27px;
  background-repeat: no-repeat;
  background-position: center;
`

export const IconButton: FC<IIconButton> = ({ icon, onClick }) => {
  return <StyledIconButton
    type="text"
    size={"small"}
    icon={
      <Icon
        component={icon}
        onClick={onClick}
      />}
  />
}

export const SaveButton = styled(IconButton)`
`

export const AddButton = styled(IconButton)`
`

export const DeleteButton = styled(IconButton)`
`

export const EditButton = styled(IconButton)`
`