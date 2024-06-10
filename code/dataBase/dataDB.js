const Users = require('../models/user')
const { dateNow } = require('../utils/dateNow')
const Bcrypt = require('bcryptjs')

class dataDB {
    static findUserByEmail(email) {
        return Users.findOne({ where: { email: email } })
    }
    static async createUser(name, email, password) {
        const hashPassword = await Bcrypt.hash(password, 10)
        return Users.create({
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password: hashPassword,
            date_register: dateNow()
        }).then(() => {
            console.log('Запись успешно создана');
        }).catch((e) => {
            console.error(e);
        });
    }
    static findUserById(id) {
        return Users.findOne({ where: { id: id } })
    }
    static updateUserData(name, lastname, email, gender, photo, userId) {
        return Users.update({
            name: name,
            last_name: lastname,
            email: email,
            gender: gender,
            photo: photo
        }, {
            where: {
                id: userId
            }
        }).then(() => {
            console.log('Запись успешно изменена');
        }).catch((e) => {
            console.error(e);
        });

    }
    static async getUserWithPagination(req, res) {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = 10;
          const offset = (page - 1) * limit;
    
          const { count, rows } = await Users.findAndCountAll({
            limit,
            offset,
            order: [['date_register', 'DESC']]  
          });
    
          res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            users: rows,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    }

module.exports = dataDB