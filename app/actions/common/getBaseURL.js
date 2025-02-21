"use server"

const getBaseURL = async() => {
    return process.env.BASE_URL;
}

export default getBaseURL;