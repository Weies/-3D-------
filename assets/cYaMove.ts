import { _decorator, Component, director, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cYaMove')
export class cYaMove extends Component {
    rigid: RigidBody
    start() {
        this.rigid = this.node.getComponent(RigidBody)
        director.getScene().on("player_move", this.onPlayerMove, this);
    }

    protected onDestroy(): void {
        if (director.getScene())
            director.getScene().off("player_move", this.onPlayerMove, this);
    }

    pp = new Vec3(-100)
    onPlayerMove(pp: Vec3) {
        this.pp.set(pp)
    }

    update(deltaTime: number) {
        let timeVec = new Vec3(deltaTime, deltaTime, deltaTime)

        if (this.node.position.y < -1) {
            director.getScene().emit("player_failed");
        }

        let dif = this.node.position.clone().subtract(this.pp).clone()
        if (dif.length() < 10) {
            this.rigid.applyForce(dif.normalize().multiply(timeVec).multiplyScalar(10000 / (dif.length() + 5)))
        }
    }
}


