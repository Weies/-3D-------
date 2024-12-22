import { _decorator, Component, Node, Collider, director } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovScreen } from './PlayerMovScreen';

@ccclass('cPlayer')
export class cPlayer extends Component {
    mov: PlayerMovScreen
    start() {
        this.mov = this.node.getComponent(PlayerMovScreen);

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


