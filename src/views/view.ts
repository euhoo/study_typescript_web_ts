import {User} from "../models/user";
import {Model} from "../models/model";

interface Viewable {
    on: (data: string, callback: () => void) => void
}

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(
        public parent: Element,
        public model: T) {
        this.bindModel();
    }

    abstract template(): string;

    eventsMap(): { [key: string]: () => void } {
        return {}
    };

    regionsMap(): { [key: string]: string } {
        return {}
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
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

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
        Object.keys(regionsMap).forEach(key => {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        })
    }
    onRender(): void {}

    render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);
        this.onRender();
        this.parent.append(templateElement.content)
    }
}
