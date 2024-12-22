import { _decorator, Component, Node, Collider, ITriggerEvent, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cYaWin')
export class cYaWin extends Component {
    ya_count = 0
    colid: Collider
    start() {
        this.colid = this.node.getComponent(Collider)
        this.colid.on("onTriggerEnter", this.onTrigger, this)

        director.getScene().children.forEach((node) => {
            if (node.name.startsWith("Ya")) this.ya_count += 1
        })
    }

    onTrigger(event: ITriggerEvent) {
        if (event.otherCollider.node.name.startsWith("Ya")) {
            event.otherCollider.node.active = false
            this.ya_count -= 1
            if (this.ya_count == 0) {
                director.getScene().emit("player_win");
            }
        }
    }

    update(deltaTime: number) {

    }
}


