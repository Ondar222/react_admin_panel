import { MainLayout } from "@/shared/layouts/layout"
import { Layout, Spin } from "antd"
import { FC } from "react"

type LoadingPageProps = {
  layout: "main" | "empty"
}

const LoadingPage: FC<LoadingPageProps> = ({ layout }) => {

  if (layout === "empty") {
    return <Spin fullscreen tip={<div>Готовим ваши данные</div>} />
  }

  return (
    <MainLayout header={""}>
      <Spin fullscreen tip={<div>Готовим ваши данные</div>} />
    </MainLayout>
  )
}

export { LoadingPage }