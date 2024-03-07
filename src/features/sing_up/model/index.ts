// первым делом делаешь объекты

interface SignUpDto {
    email: string
    phone: string
    password: string

    surname: string
    name: string

    code: string // код мы получаем на номер телефона
}

// Dto это data transfer object объект который мы отправляем в аргументы функций/body запроса и тд
// все где нужно передать объект



// модель нашего глобального стейта

interface UseSignUp {
    signUp: (dto: SignUpDto) => Promise<void>   // точно так же это асинхронная функция, функция считается асинхронной если
                                                // подразумевается работа с сетью или базой данных/*  */
}

export type { UseSignUp, SignUpDto }
