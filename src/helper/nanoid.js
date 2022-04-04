import { customRandom } from "nanoid";
import seedrandom from "seedrandom";
import { seed } from "../config/urlConfig.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$–_.+!*‘(),";
const rng = seedrandom(seed);
const nanoid = customRandom(alphabet, 12, (size) => new Uint8Array(size).map(() => 256 * rng()));

export default nanoid;
