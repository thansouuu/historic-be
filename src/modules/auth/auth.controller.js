import bcrypt from 'bcryptjs';
import { getUserByEmail } from './auth.service.js';
import { generateToken } from '../token/token.controller.js';
import catchAsync from '../../utils/catch-async.js';
import { userModel } from '../../models/user.model.js';
import { googleOAuth } from '../../utils/google-auth.js';
import lodash from 'lodash';

export const signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const { existed: isEmailExisted, data: user } = await getUserByEmail(email);

    if (!isEmailExisted) {
        return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
    }
    const isPasswordCorrect = bcrypt.compareSync(
        password,
        lodash.get(user, 'password', 'empty'),
    );

    if (!isPasswordCorrect) {
        return res.status(403).json({ message: 'Mật khẩu không đúng!' });
    }

    const token = generateToken({ userId: user._id }, { userId: user._id });

    res.status(200).json(token);
});

export const signinGoogle = catchAsync(async (req, res, next) => {
    const { access_token } = req.body;

    let data;

    const userInfo = await googleOAuth(access_token);

    const { existed: isEmailExisted, data: user } = await getUserByEmail(
        userInfo.email,
    );

    if (!isEmailExisted) {
        const doc = await userModel.create({
            fullname: userInfo.name,
            avatar: userInfo.picture,
            email: userInfo.email,
        });

        data = doc;
    } else {
        data = user;
    }

    const token = generateToken({ userId: data._id }, { userId: data._id });

    res.status(200).json(token);
});

export const signup = catchAsync(async (req, res, next) => {
    const { email, password, role, ...otherFields } = req.body;
    const { existed: isEmailExisted, data } = await getUserByEmail(email);
    console.log(isEmailExisted);
    if (isEmailExisted) {
        console.log(data);
        return res.status(404).json({
            message: 'Email đã tồn tại. Vui lòng chọn email khác để đăng kí!',
        });
    }
    if (password.length === 0) {
        return res.status(404).json({
            message: 'password để trống!',
        });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    await userModel.create({
        email,
        password: passwordHash,
        role: role || 'normal',
        ...otherFields,
    });

    res.status(200).json({ message: 'Đăng kí thành công!', data: req.body });
});

export const update = catchAsync(async (req, res, next) => {
    const { fullname, password, email, ...otherFields } = req.body;
    const { id } = req.params;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const currentUser = await userModel.findOne({ _id: id });
    const { existed: isEmailExisted, data } = await getUserByEmail(email);
    console.log(isEmailExisted);
    if (email.length === 0 || fullname.length === 0 || password.length === 0) {
        return res.status(404).json({
            message: 'Vui lòng điền đầy đủ thông tin',
        });
    }
    if (isEmailExisted && currentUser.email !== email) {
        console.log(data);
        return res.status(404).json({
            message: 'Email đã tồn tại. Vui lòng chọn email khác để đăng kí!',
        });
    }
    await userModel.findOneAndUpdate(
        { _id: id },
        {
            fullname,
            password: passwordHash,
            email,
            ...otherFields,
        },
    );

    res.status(200).json({ message: 'Đăng kí thành công!', data: req.body });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
    const { id, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const checkUserByID = await userModel.findOne({ _id: id });
    if (!checkUserByID || checkUserByID.email !== email) {
        console.log(email);
        console.log(checkUserByID);
        console.log('Sai ID');
        return res.status(404).json({
            message: 'ID hoặc email không đúng!',
        });
    }
    if (password.length === 0) {
        return res.status(404).json({
            message: 'password để trống!',
        });
    }
    await userModel.findOneAndUpdate(
        { _id: id },

        {
            password: passwordHash,
        },
    );

    res.status(200).json({
        message: 'Thay đổi mật khẩu thành công!',
        data: req.body,
    });
});
