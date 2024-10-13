import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
} from "crypto";

const ALGO = "aes-256-cbc";

const BuffBase = (data) => Buffer.from(data, "base64");

const iv = Buffer.from(randomBytes(16), "utf8");
const salt = randomBytes(32);
const KEY = Buffer.from(
  pbkdf2Sync("Your-Password", salt, 65536, 32, "sha1"),
  "utf8"
);

const encrypt = (data) => {
  const cipher = createCipheriv(ALGO, KEY, iv);
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  const KeyToProvideUser = KEY.toString("base64") + "|" + iv.toString("base64");

  return {
    encrypted,
    KeyToProvideUser,
  };
};

const decrypt = ({ encrypted, KeyToProvideUser }) => {
  const [KEY, IV] = KeyToProvideUser.split("|");

  const decipher = createDecipheriv(ALGO, BuffBase(KEY), BuffBase(IV));

  let data = decipher.update(encrypted, "base64", "utf8");
  data += decipher.final("utf8");
  return data;
};

const { encrypted, KeyToProvideUser } = encrypt("hello, world");

const decrypted = decrypt({ encrypted, KeyToProvideUser });

console.log({ encrypted, decrypted, KeyToProvideUser });
