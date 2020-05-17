import {Eventing} from "./eventing";
import {Sync} from "./sync";
import {Attributes} from "./attributes";

interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users';

export class User {
    events: Eventing = new Eventing();
    sync: Sync<UserProps> = new Sync(rootUrl);
    attributes: Attributes<UserProps>;

    constructor(data:UserProps) {
    this.attributes = new Attributes<UserProps>(data)

    }
}
