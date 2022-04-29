import User from '../models/User';

class UserController {

    async create(req, res) {
        try {
            const newUser = await User.create(req.body)
            const {id,nome, email} = newUser;
            return res.status(201).json({id,nome, email})
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(error => error.message)
            })
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['password_hash', 'created_at', 'updated_at']
                }
            });
            if(users.length == 0){
                return res.json('Ainda não existe nenhum usuário.')
            }
            return res.json(users)

        } catch (e) {
            return res.status(404).json(null)
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ["Usuário não enviado."]
                })
            }
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password_hash', 'created_at', 'updated_at']}
            });
            return res.status(200).json(user);

        } catch (e) {
            return res.status(400).json(null)
        }
    }

    async update(req, res) {
        try {

            const user = await User.findByPk(req.userId);
            if (!user) {
                return res.status(400).json({
                    errors: ["Usuário não encontrado."]
                })
            }

            const userUpdated = await user.update(req.body);

            const {id, nome, email} = userUpdated;
            return res.status(200).json({id, nome, email});

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(error => error.message)
            })
        }
    }

    async delete (req, res) {
        try{
            const user = await User.findByPk(req.userId);
            if(!user) {
                return res.status(400).json({
                    errors: ["usuário não encontrado"]
                })
            }
            await user.destroy();
            return res.status(200).json(`Usuário deletado com sucesso.`)


        }catch(e) {
            return res.status(400).json({
                errors: e.errors.map(error => error.message)
            })
        }
    }
}


export default new UserController();