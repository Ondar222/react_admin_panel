import { MainLayout } from "@/shared/layouts/layout"
import { FC } from "react"
import { RoomCreationForm } from "@/widget/room/forms/creation-form"
import { useRoomCreate } from "@/widget/room/forms/creation-form/api/hook/useRoomCreate"

const RoomCreationPage: FC = () => {
  return (
    <MainLayout header="Создание нового номера" footer="">
      <RoomCreationForm />
    </MainLayout>
  )
}

export { RoomCreationPage }