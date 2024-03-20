import { MainLayout } from "@/shared/layouts/layout"
import { Spin } from "antd"
import { FC } from "react"

const LoadingPage: FC = () => {
  return (
    <MainLayout header={""}>
      <Spin fullscreen tip={<div>Готовим ваши данные</div>} />
    </MainLayout>
  )
}

export { LoadingPage }