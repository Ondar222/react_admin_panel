import { FC } from "react";

interface IPagination {
  total_count: number
  limit: number
}

// need new inplementaion based on antd components
const Pagination: FC<IPagination> = () => {
  // const [pageCount, setPageCount] = useState<number>(total_count / limit)
  // const [pages, setPages] = useState<number[]>([])

  // useEffect(() => {
  //   const pages = []
  //   for (let i = 0; i < pageCount; i++) {
  //     pages.push(i)

  //   }
  //   setPages(pages)
  // }, [])

  return (
    <>
    </>
    // <Box>
    //   <Stack direction={"row"}>
    //     {
    //       pages.map((item, index) => {
    //         return (
    //           <Button key={index}>{item}</Button>
    //         )
    //       })
    //     }
    //   </Stack>

    // </Box>
  )
}

export { Pagination }