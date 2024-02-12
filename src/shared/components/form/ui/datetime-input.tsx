
// import { FC, useEffect, useRef, useState } from "react"

// const DatetimeInput: FC<IInput> = (options) => {
//   // const id = useId()
//   const [date, setDate] = useState<IInput["value"]>(options.value)
//   const ref = useRef<HTMLInputElement>()

//   useEffect(() => {
//     // ref.current?.style.background = "red"
//   }, [])

//   return (
//     <FormControl color={"white"}>
//       <FormLabel
//         as={"p"}
//         fontSize={16}
//       >
//         {options.label}
//       </FormLabel>
//       <InputGroup>
//         <Input
//           ref={ref}
//           type="datetime-local"
//           {...options}
//           value={date}
//           onChange={(e) => {
//             setDate(e.target.value)
//           }}
//         />
//         <InputRightElement >
//           <Icon />
//         </InputRightElement>
//       </InputGroup>

//     </FormControl >
//   )
// }

// export { DatetimeInput }