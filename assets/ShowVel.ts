import { _decorator, Component, Node, Label, Canvas, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowVel')
export class ShowVel extends Component {

    @property(Node)
    player: Node

    @property(Label)
    label: Label

    lp = new Vec3
    start() {
        this.lp.set(this.player.position)
    }

    update(deltaTime: number) {
        let vel = this.player.position.clone().subtract(this.lp).divide3f(deltaTime, deltaTime, deltaTime)
        this.label.string = vel.length().toFixed(2).toString()
        
        this.lp.set(this.player.position)
    }
}


