import multer from 'multer';
import { extname, resolve } from 'path';
//extname é um método onde podemos extrair o nome da extesão do arquivo.

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    fileFilter:(req, file, cb) => {
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return cb(new multer.MulterError('The file must be JPEG or PNG'))
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'uploads','imgs'));
        },
        filename: (req, file, cb) => {
            let newNameFile = `${Date.now()}_${random()}${extname(file.originalname)}`;
            cb(null, newNameFile)
        }
    })
}