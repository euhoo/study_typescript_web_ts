import {User} from "../models/user";

export class UserForm {
    constructor(
        public parent: Element,
        public model: User) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick
        }
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    };

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        if (input) {
            const name = input.value;
            this.model.set({name})
        }
    };

    template(): string {
        return `
        <div>
            <h1> User Form </h1>
            <div>User name: ${this.model.get('name')}</div>
            <div>User age: ${this.model.get('age')}</div>
            <input />
            <button class="set-name">Change name</button>
            <button class="set-age">Set random age</button>
        </div>
        `
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        Object.keys(eventsMap).forEach((key: string): void => {
            const [eventsName, selector] = key.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventsName, eventsMap[key])
            })
        })
    }

    render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content)
    }
}
