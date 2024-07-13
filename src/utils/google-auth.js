import axios from 'axios';

export const googleOAuth = async (token) => {
    const googleURL = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const { data } = await axios.get(googleURL, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return data;
};
