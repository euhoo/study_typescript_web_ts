import {Eventing} from "./eventing";
import {Sync} from "./sync";
import {Attributes} from "./attributes";

interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users';

export class User<T> {
    events: Eventing = new Eventing();
    sync: Sync<T> = new Sync(rootUrl);
    attributes: Attributes<T>;

    constructor(data: T) {
        this.attributes = new Attributes<T>(data)

    }
    get on() {
        return this.events.on
    }
    get trigger() {
        return this.events.trigger
    }
    get get() {
        return this.attributes.get
    }
}
