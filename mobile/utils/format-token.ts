const formatToken = (token: string) => {
    return token.replace(/^"(.*)"$/, '$1');
};

export default formatToken;
