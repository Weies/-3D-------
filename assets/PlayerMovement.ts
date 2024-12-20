import { _decorator, Component, Node, RigidBody, Camera, Vec3, input, EventKeyboard, Input, KeyCode } from 'cc';
const { ccclass, property } = _decorator;
import { win } from './win';

@ccclass('NewComponent')
export class PlayerMovement extends Component {

    @property(Number)
    speed: number = 0

    @property(RigidBody)
    rigidBody: RigidBody

    @property(Camera)
    camera: Camera

    win: win

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        this.lpos = this.rigidBody.node.position.clone()
        this.win = this.node.getComponent(win)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    fw = 0.0
    lf = 0.0
    stop = false
    vel = new Vec3
    lpos = new Vec3

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
            if (this.vel.length() < 1.0) {
                this.forward(0.3)
            }
        }
        else if (event.keyCode == KeyCode.KEY_S) {
            this.fw = -1.0
        }
        else if (event.keyCode == KeyCode.KEY_D) {
            this.lf = -1.0
            this.left(-0.1)
        }
        else if (event.keyCode == KeyCode.KEY_A) {
            this.lf = 1.0
            this.left(0.1)
        }
    }

    forward(v: number) {
        let force = new Vec3(0, 0, -this.speed * v)
        this.rigidBody.applyForce(force)
    }

    left(v: number) {
        let leftF = new Vec3(-this.speed * v, 0, 0)
        this.rigidBody.applyForce(leftF)
    }

    damp(v: number) {
        this.rigidBody.applyForce(this.vel.multiply(new Vec3(-v, -v, -v)))
        let anglev = new Vec3
        this.rigidBody.getAngularVelocity(anglev)
        this.rigidBody.setAngularVelocity(anglev.multiply(new Vec3(-v, -v, -v)))
    }


    update(deltaTime: number) {
        let timeVec = new Vec3(deltaTime, deltaTime, deltaTime)
        let pos = this.rigidBody.node.position.clone()
        this.vel = pos.subtract(this.lpos).divide(timeVec).clone()
        if (this.node.position.y < -1) {
            this.win.onFailed()
            this.enabled = false
        }
        if (this.stop) {
            if (this.vel.length() > 1.0) {
                this.damp(1.0)
            }
        }
        else {
            if (this.lf != 0) {
                this.left(deltaTime * this.lf)
            }

            if (this.fw != 0) {
                this.forward(deltaTime * this.fw)
            }
        }
        this.lpos = this.rigidBody.node.position.clone()
    }

}


