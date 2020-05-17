import {UserForm} from "./views/userForm";
import {User} from "./models/user";

const user = User.buildUser({name: 'NAME', age: 20});
const root = document.getElementById('root');
if (root) {
    const userForm = new UserForm(root, user);
    userForm.render();

} else {
    throw new Error('Root element not found');
}
