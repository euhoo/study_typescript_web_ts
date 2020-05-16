import axios, {AxiosResponse} from 'axios'

interface UserProps {
    id?: number
    name?: string
    age?: number
}

type Callback = () => void
const baseUrl = 'http://localhost:3000/users';

export class User {
    events: {
        [key: string]: Callback[]
    } = {};

    constructor(private data: UserProps) {
    }

    get(propName: string): (string | number) {
        return this.data[propName]
    }

    set(update: UserProps): void {
        this.data = {...this.data, ...update}
    }

    on(eventName: string, callback: Callback) {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || !handlers.length) {
            return
        }
        handlers.forEach((cb) => {
            cb()
        })
    }

    fetch(): void {
        axios.get(`${baseUrl}/${this.get('id')}`)
            .then((response: AxiosResponse<UserProps>): void => {
                this.set(response.data);
            });
    }

    save(): void {
        const id = this.get('id');
        if (id) {
            axios.put(`${baseUrl}/${id}`, this.data)
        } else {
            axios.post(`${baseUrl}`, this.data)
                .then((response: AxiosResponse<UserProps>) => {
                    this.set(response.data)
                })
        }
    }
}
