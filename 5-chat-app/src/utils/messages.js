const generateMessage = (username,text) => {
    const currentDate = new Date().getTime();
    return {
        text,
        createdAt: currentDate,
        username
    };
};
const generateLocation = (username,url) => {
    const currentDate = new Date().getTime();
    return {
        url,
        createdAt: currentDate,
        username
    };
};
module.exports = {
    generateMessage,
    generateLocation
};
