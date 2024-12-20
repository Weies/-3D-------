import { _decorator, Component, Node, Label, Color } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('win')
export class win extends Component {

    @property(Label)
    win: Label

    mov: PlayerMovement

    start() {
        this.mov = this.node.getComponent(PlayerMovement)
    }

    onWin() {
        this.win.enabled = true
        this.mov.enabled = false
    }

    onFailed() {
        this.win.enabled = true
        this.win.string = "YOU FAILED"
        this.win.color = new Color(255.0, 0, 0,)
        this.mov.enabled = false
    }

    update(deltaTime: number) {

    }
}


