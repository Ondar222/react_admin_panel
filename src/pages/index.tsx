import { useContext } from "react"
import AuthProvider from "../features/auth/api/authProvider"
import { MainLayout } from "@/shared/layouts/layout"
import { Layout } from "antd/lib"


function App() {
  const isAuth = useContext(AuthProvider)

  return (
    <Layout />
    // <Layout></Layout>
    // <MainLayout
    //   header={
    //     <div>
    //       <h2>asd</h2>
    //     </div>
    //   }
    //   footer={
    //     <div>
    //       <h2>asd</h2>
    //     </div>
    //   }
    // >
    // </MainLayout>
  )
}

export default App