import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('photo');

class PhotoController {

    store(req, res) {
        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    errors: [err.code],
                })
            }            
            try {
                const { aluno_id } = req.body;
                if (!aluno_id) {
                    return res.status(400).json({
                        errors: ["Id student not exists."],
                    })
                }

                const { filename } = req.file;

                const photo = await Foto.create({ filename, aluno_id });
                return res.status(200).json(photo);

            } catch (e) {
                return res.status(400).json({
                    errors: ["Student not exists."]
                })
            }

        })
    }

}

export default new PhotoController;