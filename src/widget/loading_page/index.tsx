import { MainLayout } from "@/shared/layouts/layout"
import { Layout, Spin } from "antd"
import { FC } from "react"

type LoadingPageProps = {
  layout: "main" | "empty"
}

const LoadingPage: FC<LoadingPageProps> = ({ layout }) => {

  return (
    <Spin
      fullscreen
      tip={
        <div>Готовим ваши данные</div>
      } />
  )
}

export { LoadingPage }