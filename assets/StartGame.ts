import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('StartGame')
export class StartGame extends Component {

    @property(Node)
    player: Node

    @property(Button)
    button: Button

    mov: PlayerMovement
    start() {
        this.mov = this.player.getComponent(PlayerMovement)
    }

    onStart()
    {
        this.mov.enabled = true
        this.node.active = false
    }

    update(deltaTime: number) {

    }
}


