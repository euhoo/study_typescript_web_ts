import {Model} from "./model";
import {Attributes} from "./attributes";
import {Eventing} from "./eventing";
import {ApiSync} from "./apiSync";
import {Collection} from "./collection";

export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl),
        )
    }
    // static buildLocalUser(attrs: UserProps): User {
    //     return new User(
    //         new Attributes<UserProps>(attrs),
    //         new Eventing(),
    //         new LocalSync<UserProps>(rootUrl),
    //     )
    // }
    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            'http://localhost:3000/users',
            (json: UserProps) => User.buildUser(json)
        )
    }
}
