import jwt_decode from 'jwt-decode';

export default function checkIfTokenIsExpired(token) {
    let toke = jwt_decode(token);
    let tokenExp = new Date(toke.exp);
}