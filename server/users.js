const users = [];

const addUser = ({id, name, }) => {

    const existingUser = users.find( (user) => user.name === name);

    if(existingUser){
        return {error: 'Username is taken'};
    }

    const user = {id, name};
    users.push(user);

    return { user };
}


const removeUser = (id) => {

    const index = users.findIndex( (user) => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }

}


const getUser = (id) => {
    return users.find( (user) => user.id === id);
}


const getUsersInRoom = () => {
    return users;

}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};