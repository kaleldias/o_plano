import jwt from 'jsonwebtoken';


if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido. Configure o arquivo .env!');
}

const SECRET_KEY = process.env.JWT_SECRET;

export const verificarToken = async (req, res, next) => {
    // Procura Token no cookie
    let accessToken = req.cookies?.accessToken

    /*
        Se o token não estiver no cookie, 
        verifica o cabeçalho Authorization.
        
        OBS: Util para podermos fazer chamadas via  postman passando: {'Authorization': 'Bearer eyac82...'}
    */
    if (!accessToken && req.headers.authorization) {
        accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }


    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}