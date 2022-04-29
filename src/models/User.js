import Sequelize, { Model } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class User extends Model{
    static init (sequelize) {
        super.init ({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                //validações
                validate: {
                    len: {
                        args: [3,200],
                        msg: 'Campo nome deve ter entre 3 e 200 caracteres.'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'E-mail já existente'
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido.'
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue:'',
                validate: {
                    len: {
                        args: [6,50],
                        msg: 'A senha precisa ter entre 6 a 50 caracteres.'
                    }
                }
            }

        },{
            sequelize
        });

        this.addHook('beforeSave', async user => {
            if(user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })

        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

}