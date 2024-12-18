import { _decorator, Component, Node, BoxCollider, ICollisionEvent, ConeCollider } from 'cc';
import { NewComponent } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('SyopGame')
export class SyopGame extends Component {

    @property(Node)
    player: Node;

    start() {
        let colid = this.node.getComponent(ConeCollider)
        colid.on("onCollisionEnter", this.onColisionEnter, this)
    }

    onColisionEnter(event: ICollisionEvent) {
        console.log(this.player)

        if (event.otherCollider == this.player.getComponent(BoxCollider)) {
            let move = this.player.getComponent(NewComponent)
            move.stop = true
        }
    }

    protected onDestroy(): void {
        let colid = this.node.getComponent(ConeCollider)
        colid.off('onCollisionEnter', this.onColisionEnter, this)
    }

    update(deltaTime: number) {
    }
}


