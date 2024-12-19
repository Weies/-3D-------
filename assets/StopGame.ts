import { _decorator, Component, Node, BoxCollider, ICollisionEvent, ConeCollider, Collider } from 'cc';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('SyopGame')
export class SyopGame extends Component {

    @property(Node)
    player: Node;

    start() {
        let colid = this.node.getComponent(Collider)
        colid.on("onCollisionEnter", this.onColisionEnter, this)
        colid.on("onTriggerEnter", this.onTrigger, this)
    }

    onTrigger(event: ICollisionEvent) {
        if (event.otherCollider.node == this.player) {
            let move = this.player.getComponent(PlayerMovement)
            move.stop = true
        }
    }

    onColisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.node == this.player) {
            let move = this.player.getComponent(PlayerMovement)
            move.stop = true
            move.enabled = false
        }
    }

    protected onDestroy(): void {
        let colid = this.node.getComponent(Collider)
        colid.off('onCollisionEnter', this.onColisionEnter, this)
        colid.off("onTriggerEnter", this.onTrigger, this)
    }

    update(deltaTime: number) {
    }
}


