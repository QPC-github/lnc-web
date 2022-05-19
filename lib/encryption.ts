import { AES, enc } from 'crypto-js';

const TEST_DATA = 'Irrelevant data for password verification';

export const generateSalt = () => {
    const validChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    array = array.map((x) => validChars.charCodeAt(x % validChars.length));
    const salt = String.fromCharCode.apply(null, array as any);
    return salt;
};

export const encrypt = (data: any, password: string, salt: string) => {
    return AES.encrypt(JSON.stringify(data), password + salt).toString();
};

export const decrypt = (cipher: any, password: string, salt: string) => {
    const decrypted = AES.decrypt(cipher, password + salt);
    return JSON.parse(decrypted.toString(enc.Utf8));
};

export const createTestCipher = (password: string, salt: string) => {
    return encrypt(TEST_DATA, password, salt);
};

export const verifyTestCipher = (
    testCipher: string,
    password: string,
    salt: string
) => {
    const decrypted = decrypt(testCipher, password, salt);
    return decrypted === TEST_DATA;
};
