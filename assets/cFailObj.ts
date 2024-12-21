import { _decorator, Component, director, Collider, ICollisionEvent } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('sFailObj')
export class sFailObj extends Component {
    colid: Collider
    start() {
        this.colid = this.node.getComponent(Collider)
        this.colid.on("onCollisionEnter", this.onColisionEnter, this)
    }

    protected onDestroy(): void {
        this.colid.off('onCollisionEnter', this.onColisionEnter, this)
    }

    onColisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.node.getComponent(PlayerMovement)) {
            director.getScene().emit("player_failed")
        }
    }

    update(deltaTime: number) {

    }
}


