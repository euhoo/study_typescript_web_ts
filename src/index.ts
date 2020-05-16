import {User} from "./models/user";

const user = new User({name: 'myname', age: 20});

user.on('change', () => {
    console.log('change1');
});
user.on('change', () => {

    console.log('change2');
});
user.on('save', () => {
    console.log('save');
});
user.trigger('wfawef');
