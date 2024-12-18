import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HUD_Distance')
export class HUD_Distance extends Component {

    @property(Node)
    player:Node;

    content:Label;

    start() {
        this.content = this.node.getComponent(Label);
    }

    update(deltaTime: number) {
        this.content.string = this.player.position.z.toFixed(1).toString();
    }
}

