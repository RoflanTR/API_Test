const { body } = require('express-validator')
const dataDB = require('../dataBase/dataDB')
exports.editValidations = [
    body('email', 'Введите корректный email').isEmail().custom(async (value, {req}) => {
        try {
            const user = await dataDB.findUserByEmail(value)
            if(user.dataValues.id != req.params.id){
                return Promise.reject('Данный email уже занят')
            }
        } catch (error) {
            console.log(error)
        }
    }),
    body('lastname', 'Фамилия должна быть не менее 3 символов и не более 20').trim().isLength({ min: 3, max: 20 }),
    body('lastname', 'Фамилия должна состоять только из букв').trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('name', 'Имя должно быть не менее 3 символов и не более 20').trim().isLength({ min: 3, max: 20 }),
    body('name', 'Имя должно состоять только из букв').trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('gender', 'Выберете пол из списка').notEmpty(),
    body('gender', 'Не верные данные поля gender').isIn([1, 2])
]
