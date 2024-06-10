const { body } = require('express-validator')
const dataDB = require('../dataBase/dataDB')
exports.registerValidations = [
    body('email', 'Введите корректный email').isEmail().custom(async (value, {req}) => {
        try {
            const user = await dataDB.findUserByEmail(value)
            console.log(user)
            if(user != null){
                return Promise.reject('Данный email уже занят')
            }
        } catch (error) {
            console.log(error)
        }
    }),
    body('password', 'Пароль должен быть не менее 6 символов и не более 20').trim().isLength({ min: 6, max: 20 }),
    body('password', 'Пароль должен содержать в себе одну цифру, одну строчную и одну заглавную буквы').matches(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d]+$/),
    body('name', 'Имя должно состоять только из букв').trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('name', 'Имя должно быть не менее 3 символов и не более 20').trim().isLength({ min: 3, max: 20 }),
]
