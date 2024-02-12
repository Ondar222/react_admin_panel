import { FC } from "react";

const YurtaRelationArrayInput: FC<any> = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [state, setState] = useState<any>(undefined)

  return (
    <>
      {/* <FormControl>
        <FormLabel>{label}</FormLabel>
        <Stack direction={"column"} gap={4}>
          {
            data
              ?
              items
              :
              <InputGroup>
                <Input
                  readOnly={true}
                  onClick={() => setIsOpen(true)}
                  value={state ? state : "Выберите элементы"}
                  cursor={"pointer"}
                />
                <InputRightElement >
                </InputRightElement>
                <InputRightElement>
                  <IconButton
                    variant={"ghost"}
                    aria-label="clear"
                    icon={<CloseIcon
                      color={"white"}
                      _hover={{
                        color: "red"
                      }}
                      _active={{
                        color: "white"
                      }}
                    />}
                    _hover={{
                      color: "none"
                    }}
                    _active={{
                      color: "black",
                      background: "red"
                    }}
                  />
                </InputRightElement>
              </InputGroup>
          }
          <Stack
            w={"full"}
            justifyContent={"end"}
            direction={"row"}
          >
            <Button onClick={onCreateButtonClick}>Создать</Button>
            <Button onClick={() => setIsOpen(true)}>Выбрать</Button>
          </Stack>
        </Stack>


      </FormControl>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader >Header</DrawerHeader>
          <DrawerBody>
            <YurtaInput label="Поиск" placeholder="Поиск по элементам" />

            <List
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              py={4}
            >
              {
                data?.map((item: Room) => {
                  return (
                    <ListItem>
                      <Button>{item.name}</Button>
                    </ListItem>
                  )
                })
              }
            </List>
          </DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
  )
}

export { YurtaRelationArrayInput }