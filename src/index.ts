import {UserForm} from "./views/userForm";
import {User} from "./models/user";
import {UserEdit} from "./views/userEdit";

const user = User.buildUser({name: 'NAME', age: 20});
const root = document.getElementById('root');
if (root) {
    const userEdit = new UserEdit(root, user);
    userEdit.render();

} else {
    throw new Error('Root element not found');
}
