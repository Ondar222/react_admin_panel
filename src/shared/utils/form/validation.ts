import { isPositive, isEmpty, isNegative } from "class-validator";

const validateNumberInputValue = (rule, value: number) => {
    if (isNegative(Number(value))) {
        return Promise.reject('Значение не может быть меньше нуля');
    }
    else if (isEmpty(value)) {
        return Promise.reject('Значение не может быть пустым');
    }
    else {
        return Promise.resolve()
    }
};

export { validateNumberInputValue }