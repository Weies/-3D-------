import { _decorator, Component, Node, Collider, ICollisionEvent, ITriggerEvent, director } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('cWinObj')
export class cWinObj extends Component {
    colid: Collider
    start() {
        this.colid = this.node.getComponent(Collider)
        this.colid.on("onTriggerEnter", this.onTriggerEnter, this)
    }

    protected onDestroy(): void {
        this.colid.off('onTriggerEnter', this.onTriggerEnter, this)
    }

    onTriggerEnter(event: ITriggerEvent) {
        if (event.otherCollider.node.getComponent(PlayerMovement)) {
            director.getScene().emit("player_win")
        }
    }

    update(deltaTime: number) {

    }
}

