const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const User = require('./user.model');
const bcrypt = require('bcryptjs');

const authenticate = ({ username, password }) => {
    return User.findOne({ username: username }).then((user) => {
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            if (!result)
                return null;

            const expiresIn = 24*60*60;
            const { _id , roles } = user;
            const accessToken = jwt.sign({ id: user._id, roles: user.roles, username }, config.secret, {
                expiresIn:  expiresIn
            });

            return {
                id: _id,
                username,
                roles,
                accessToken
            }
        }
    });
};

const register = ({ username, password }) => {
    let user = new User({ 
        username: username, 
        roles: ['Admin'],
        password: bcrypt.hashSync(password) 
    });
    
    return user.save().then((user) => {
        const expiresIn = 24*60*60;
        const { _id , roles } = user;
        const accessToken = jwt.sign({ id:  user._id, roles: user.roles }, config.secret, {
            expiresIn:  expiresIn
        });
        
        return {
            id: _id,
            username,
            roles,
            accessToken
        }
    });
};

const getAll = async () => {
    /*return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });*/
    return [];
};

const getById = async (id) => {
    /*const user = users.find(u => u.id === parseInt(id));
    if (!user)
        return;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;*/
    return null;
};

module.exports = {
    authenticate,
    register,
    getAll,
    getById
};
