import { jwtDecode } from 'jwt-decode';

const payloadParser = (req, _, next) => {
    try {
        const { authorization } = req.headers || {};
        const [_, token] = authorization?.split(' ');

        const userDataDecode = jwtDecode(token);

        req.user = userDataDecode;
    } catch (err) {
        req.user = null;
    }

    next();
};

export default payloadParser;
