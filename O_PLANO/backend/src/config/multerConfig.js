import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve o __dirname no contexto de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajustando o caminho para a pasta correta de uploads
const uploadsPath = path.resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath); // Define o caminho correto para a pasta de uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    console.log('Tipo de arquivo recebido:', file.mimetype);
    const extensaoImg = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].find(
        formatoAceito => formatoAceito == file.mimetype
    );

    if (extensaoImg) {
        cb(null, true);
    } 
    else {
        cb(new Error('Tipo de arquivo não suportado. Apenas JPEG, JPG, PNG e GIF são permitidos.'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
    }
});

export default upload;
