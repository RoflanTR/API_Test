const { Router } = require('express')
const { validationResult } = require('express-validator')
const { registerValidations } = require('../utils/validatorRegistration')
const { editValidations } = require('../utils/validatorEdit')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Image = require('../utils/deleteOldImg')
const Bcrypt = require('bcryptjs')
const dataDB = require('../dataBase/dataDB')



const router = Router()


/*Регистрация пользователя */
router.post('/user/register', registerValidations, async (req, res) => {
    try {
        const { name, email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }

        await dataDB.createUser(name, email, password)
        const dataUser = (await dataDB.findUserByEmail(email))?.dataValues
        return res.status(200).json({ succesful: 'Успешно зарегестрирован', userId: dataUser.id, name: dataUser.name, lastname: dataUser.lastname, email: dataUser.email, gender: dataUser.gender, photo: dataUser.photo, date_register: dataUser.date_register })
    } catch (e) {
        console.log(e)
    }

})

/*Авторизация пользователя */
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const dataUser = (await dataDB.findUserByEmail(email))?.dataValues

        if (dataUser) {
            let unHashPassword = await Bcrypt.compare(password, dataUser.password);
            if (unHashPassword) {
                const token = jwt.sign({
                    email: dataUser.email,
                    userId: dataUser.id
                }, keys.JWT,{expiresIn: 60*60})
                return res.status(200).json({ succesful: 'Успешно авторизован', userId: dataUser.id, name: dataUser.name, lastname: dataUser.lastname, email: dataUser.email, gender: dataUser.gender, photo: dataUser.photo, date_register: dataUser.date_register, token: `Bearer ${token}` })
            }
            else {
                return res.status(422).json({ error: 'Некорректные  данные для входа' });
            }
        }
        else {
            return res.status(404).json({ error: 'Такой пользователь не найден' });
        }
    } catch (error) {
        console.log(error)
    }
})

/*Редактирование пользователя */
router.put('/profile/:id', editValidations,passport.authenticate('jwt', {session:false}), async (req, res) => {
    try {
        
        const whetherUser = (await dataDB.findUserById(req.params.id))?.dataValues
        const { name, lastname, email, gender } = req.body
        var photo;
        if (whetherUser != null) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                if (req.file) {
                    Image.deleteByName(req.file.filename)
                }
                return res.status(422).json({ error: errors.array()[0].msg });
            }
            if (req.file) {
                Image.deleteById(req.params.id)
                photo = req.file.filename
            }
            if (!req.file) {
                return res.status(422).json({ error: 'Изображение должно быть не более 10мб и иметь формат png или jpg' });
            }
        }
        else {
            return res.status(422).json({ error: `Пользователя с id ${req.params.id} не существует` });
        }

        await dataDB.updateUserData(name, lastname, email, gender, photo, req.params.id)
        const dataUser = (await dataDB.findUserById(req.params.id))?.dataValues
        return res.status(200).json({ succesful: 'Успешно изменена', userId: dataUser.id, name: dataUser.name, lastname: dataUser.lastname, email: dataUser.email, gender: dataUser.gender, photo: dataUser.photo, date_register: dataUser.date_register })


    } catch (error) {
        console.log(error)
    }
})

/*Получение пользователя по id*/
router.get('/profile/:id',passport.authenticate('jwt', {session:false}), async (req, res) => {
    try {
        const dataUser = await dataDB.findUserById(req.params.id)
        if (dataUser) {
            return res.status(200).json({ succesful: 'Пользователь найден', userId: dataUser.id, name: dataUser.name, lastname: dataUser.lastname, email: dataUser.email, gender: dataUser.gender, photo: dataUser.photo, date_register: dataUser.date_register })
        }
        else {
            return res.status(422).json({ error: `Пользователя с id ${req.params.id} не существует` });
        }
    } catch (error) {
        console.log(error)
    }
})
/*Получение всех пользователей с пагинацией*/
router.get('/profiles',passport.authenticate('jwt', {session:false}), dataDB.getUserWithPagination);

module.exports = router