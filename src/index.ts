import {Collection} from "./models/collection";
import {User, UserProps} from "./models/user";
import {UserList} from "./views/userList";


const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
    return User.buildUser(json);
});

users.on('change', () => {
    const root = document.getElementById('root');
    console.log(JSON.parse(JSON.stringify(users)));
    if (root) {
        new UserList(root, users).render();
    }
});

users.fetch();
