import { MainLayout } from "@/shared/layouts/layout"
import { FC } from "react"
import { RoomCreationForm } from "@/widget/room/forms/creation-form"

const RoomCreationPage: FC = () => {
  return (
    <MainLayout header="Создание нового номера" footer="">
      <RoomCreationForm />
    </MainLayout>
  )
}

export { RoomCreationPage }