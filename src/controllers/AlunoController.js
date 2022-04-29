import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
    async index(req, res) {
        const alunos = await Aluno.findAll({
            attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
            order:[['id', 'DESC'], [Foto, 'id', 'DESC']],
            // aqui que vem o inner join/left join(relacionamento)
            include:{
                model: Foto,
                attributes: ['id','filename', 'url']
            }
        });
        return res.json(alunos)
    }

    async store(req, res) {
        try {
            const student = await Aluno.create(req.body);
            const { id, nome, sobrenome, email, idade, peso, altura } = student;
            return res.status(200).json({ id, nome, sobrenome, email, idade, peso, altura })

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((error) => error.message)
            })
        }
    }
    async show(req, res) {
        try {
            const { idStudent } = req.params;
            if (!idStudent) {
                return res.status(400).json({
                    errors: ["Missing id."]
                })
            }
            const student = await Aluno.findByPk(idStudent, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order:[['id', 'DESC'], [Foto, 'id', 'DESC']],
                include:{
                    model: Foto,
                    attributes: ['id','filename','url']
                }
            });
            if (!student) {
                return res.status(400).json({
                    errors: ["Student not exists."]
                })
            }

            return res.status(200)
                .json(student);

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((error) => error.message)
            })
        }

    }

    async update(req, res) {
        try {
            const { idStudent } = req.params;
            if (!idStudent) {
                return res.status(400).json({
                    errors: ["Missing Id"]
                })
            }
            const student = await Aluno.findByPk(idStudent);
            if (!student) {
                return res.status(400).json({
                    errors: ["Student not exists."]
                })
            }
            const { id, nome, sobrenome, email, idade, peso, altura } = await student.update(req.body);

            return res.status(200).json({ id, nome, sobrenome, email, idade, peso, altura });
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((error) => error.message)
            })
        }
    }

    async delete(req, res) {
        try {
            const { idStudent } = req.params;
            if (!idStudent) {
                return res.status(400).json({
                    errors: ["Missing Id user"]
                })
            }
            const student = await Aluno.findByPk(idStudent);

            if (!student) {
                return res.status(400).json({
                    errors: ["Student not exists."]
                })
            }
            await student.destroy();
            res.status(200).json({
                msg: "Student was delete."
            })
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((error) => error.message)
            })
        }
    }
}

export default new AlunoController;