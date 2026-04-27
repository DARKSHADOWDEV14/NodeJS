export const {
    PORT = 3000,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY = 'la_clave_secreta_para_firmar_los_tokens_debe_ser_muy_segura'
} = process.env;