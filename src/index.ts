import {User} from "./models/user";

// const user = new User({id: 1});
const user = new User({name: 'new record', age: 0});
user.set({name: 'NEW', age: 999});
user.save();
console.log(user);
