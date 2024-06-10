const dataDB = require('../dataBase/dataDB')
const path = require('path')
const fs = require('fs');



class Image {

    static async deleteById(id) {
        const user = (await dataDB.findUserById(id))?.dataValues
        if (user && user.photo) {
            const fileImgPath = `${path.join(__dirname, '../img')}/${user.photo}`;
            fs.unlink(fileImgPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return;
                }
                console.log('Файл успешно удален');
            });
        }
    }
    static async deleteByName(nameImg){
        const fileImgPath = `${path.join(__dirname, '../img')}/${nameImg}`;
            fs.unlink(fileImgPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return;
                }
                console.log('Файл успешно удален');
            });
    }

}
module.exports = Image





