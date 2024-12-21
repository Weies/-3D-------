import { _decorator, Component, Node, Label, Canvas } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('ShowVel')
export class ShowVel extends Component {

    @property(Node)
    player: Node

    @property(Label)
    label: Label

    mov: PlayerMovement
    start() {
        this.mov = this.player.getComponent(PlayerMovement)
    }

    update(deltaTime: number) {
        this.label.string = this.mov.vel.length().toFixed(2).toString()
    }
}


