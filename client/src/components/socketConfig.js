import io from 'socket.io-client';

// const ENDPOINT = 'https://app852.herokuapp.com/';
const ENDPOINT = 'localhost:5000';

const socket = io(ENDPOINT);

export default socket;