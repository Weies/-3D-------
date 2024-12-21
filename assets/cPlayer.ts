import { _decorator, Component, Node, Collider, director } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';

@ccclass('cPlayer')
export class cPlayer extends Component {

    @property(Node)
    god: Node

    mov: PlayerMovement
    start() {
        this.mov = this.node.getComponent(PlayerMovement);

        director.getScene().on("game_start", this.beginMove, this);
        director.getScene().on("player_win", this.onWin, this);
        director.getScene().on("player_failed", this.onFailed, this);
    }

    beginMove() {
        this.mov.stop = false
        this.mov.enabled = true
    }

    endMove() {
        this.mov.stop = true
        this.mov.enabled = false
    }

    onFailed() {
        if (this.mov.enabled) {
            this.endMove()
        }
    }

    onWin() {
        if (this.mov.enabled) {
            this.endMove()
        }
    }

    update(deltaTime: number) {

    }
}


