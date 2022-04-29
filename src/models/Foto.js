import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {
    static init(sequelize) {
        super.init({
            filename: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: "No files uploaded."
                    }
                },
            },
            url: {
                type: Sequelize.VIRTUAL,
                get(){
                    return `${appConfig.url}/imgs/${this.getDataValue('filename')}`
                }

            }
            //criar campo aluno_id para validar os dados
        },
            { sequelize })

        return this;
        //adicionar um hook para adicionar o filname já com a url do servidor
    }
}