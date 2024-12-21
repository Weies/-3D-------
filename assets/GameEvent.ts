import { _decorator, Component, Node, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameEvent')
export class GameEvent extends Component {

    @property(Label)
    win: Label

    @property(Label)
    fail: Label

    @property(Node)
    restart: Node

    @property(Node)
    startb: Node

    @property(Node)
    next: Node

    start() {
        director.getScene().on("player_win", this.onWin, this);
        director.getScene().on("player_failed", this.onFailed, this);
    }

    onWin() {
        if (!this.fail  .enabled) {
            this.win.enabled = true
            this.restart.active = true
            this.next.active = true
        }
    }

    onFailed() {
        if (!this.win.enabled) {
            this.fail.enabled = true
            this.restart.active = true
        }
    }

    onStart() {
        this.startb.active = false
        director.getScene().emit("game_start")
    }

    onRestart() {
        this.restart.active = false
        this.win.enabled = false
        this.fail.enabled = false
        director.loadScene(director.getScene().name)
        director.getScene().emit("game_start")
    }

    onNextLevel() {
        director.loadScene("db://assets/level2.scene")
    }

    update(deltaTime: number) {

    }
}


