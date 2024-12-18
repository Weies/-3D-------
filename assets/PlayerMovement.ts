import { _decorator, Component, Node, RigidBody, Camera, Vec3, input, EventKeyboard, Input, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property(Number)
    speed: number = 0

    @property(RigidBody)
    rigidBody: RigidBody

    @property(Camera)
    camera: Camera

    start() {

        // this.rigidBody.applyForce(new Vec3(0,0,-500))
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    fw = 0.0
    lf = 0.0
    stop = false

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_W || event.keyCode == KeyCode.KEY_S) {
            this.fw = 0.0
        }
        else if (event.keyCode == KeyCode.KEY_D || event.keyCode == KeyCode.KEY_A) {
            this.lf = 0.0
        }
    }
    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_W) {
            this.fw = 1.0
        }
        else if (event.keyCode == KeyCode.KEY_S) {
            this.fw = -1.0
        }
        else if (event.keyCode == KeyCode.KEY_D) {
            this.lf = -1.0
        }
        else if (event.keyCode == KeyCode.KEY_A) {
            this.lf = 1.0
        }
    }


    update(deltaTime: number) {
        if (this.stop)
            return

        if (this.lf != 0) {
            let leftF = new Vec3(-1000 * deltaTime * this.lf, 0, 0)
            this.rigidBody.applyForce(leftF)
        }

        if (this.fw != 0) {
            let force = new Vec3(0, 0, -this.speed * this.fw * deltaTime)
            this.rigidBody.applyForce(force)
        }

    }

}


