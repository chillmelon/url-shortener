import { customAlphabet } from "nanoid";

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$–_.+!*‘(),';
const nanoid = customAlphabet(alphabet, 12);

export default nanoid;
