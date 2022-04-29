import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
    //sequelize é a conexao com bd
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [2, 200],
                        msg: "Nome precisa ter entre 2 a 200 caracteres."
                    }

                }
            },
            sobrenome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [2, 200],
                        msg: "Sobrenome precisa ter entre 2 a 200 caracteres."
                    }

                }
            },
            email:{
                type: Sequelize.STRING,
                defaultValue: '',
                unique:{
                    msg:"E-mail já existe."
                },
                validate:{
                    isEmail: {
                        msg: "E-mail inválido."
                    }
                }
            },
            idade: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg:'Idade inválida.'
                    }
                }
            },
            peso: {
                type: Sequelize.FLOAT,
                defaultValue:'',
                validate: {
                    isFloat: {
                        msg: "Peso está inválido."
                    }
                }
            },
            altura: {
                type: Sequelize.FLOAT,
                defaultValue:'',
                validate:{
                    isFloat:{
                        msg:"Altura está inválida."
                    }
                }
            },
        }, {
            sequelize
        });
        return this; // aqui vou retornar os dados criados na tabela
    }
    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'aluno_id'})
    }
}