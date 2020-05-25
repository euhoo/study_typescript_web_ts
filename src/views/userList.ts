import {ColelctionView} from "./colelctionView";
import {User, UserProps} from "../models/user";
import {UserShow} from "./userShow";

export class UserList extends ColelctionView<User, UserProps> {
    renderItem(model: User, itemParent: Element): void {
        new UserShow(itemParent, model).render();
    }

}
