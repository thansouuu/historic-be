import { userModel } from '../../models/user.model.js';

/**
 * Hàm này là một static method được thêm trong userModel
 * @param {*} email
 * @returns {{ existed: boolean, data: any }}
 */
export const getUserByEmail = (email) => {
    return userModel.isEmailExisted(email);
};
