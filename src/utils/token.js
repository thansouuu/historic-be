import jwt from 'jsonwebtoken';

export const registryToken = (data, options) => {
    const { expiresIn } = options || {};

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn || process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME,
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch {
        return null;
    }
};
