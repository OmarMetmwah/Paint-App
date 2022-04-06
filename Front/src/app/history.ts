import Konva from "konva";
export class Originator {
    private state: Konva.Stage;

    constructor(state: Konva.Stage) {
        this.state = state;
    }
    public save(): Memento {
        return new ConcreteMemento(this.state);
    }
    public restore(memento: Memento): Konva.Stage {
        this.state = memento.getState().clone();
        return this.state;
    }
}
interface Memento {
    getState(): Konva.Stage;
}

class ConcreteMemento implements Memento {
    private state: Konva.Stage;

    constructor(state: Konva.Stage) {
        this.state = state.clone();
    }

    public getState(): Konva.Stage {
        return this.state;
    }

}
export class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        this.mementos.push(this.originator.save());
        console.log(this.mementos.length);
    }

    public undo(): Konva.Stage {
        if (!this.mementos.length) {
            return new Konva.Stage({ container: 'container' });
        }
        console.log("undo");
        let memento = this.mementos.pop();
        return this.originator.restore(memento!);
    }

    public showHistory(): void {
        for (const memento of this.mementos) {
            console.log(memento.getState().getChildren()[0].children);
        }
    }
}