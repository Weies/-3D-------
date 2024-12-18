import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property(Number)
    speed: number

    @property(RigidBody)
    rigidBody: RigidBody

    start() {
        this.rigidBody.applyForce(new Vec3(-5,0,0))
    }

    

    update(deltaTime: number) {

    }

}


