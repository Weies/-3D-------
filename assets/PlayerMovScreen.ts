import { _decorator, Component, RigidBody, Vec3, input, EventKeyboard, Input, KeyCode, director, Node, Camera, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovScreen')
export class PlayerMovScreen extends Component {
    @property(Number)
    speed: number = 1000

    @property(Camera)
    camera: Camera

    @property(Node)
    locator: Node

    rigidBody: RigidBody

    target = new Vec3()

    start() {
        this.target.set(this.node.position)
        this.rigidBody = this.node.getComponent(RigidBody);
        this.locator.position = this.node.position;

        input.on(Input.EventType.TOUCH_END, this.onNewTarget, this)

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        this.lpos = this.rigidBody.node.position.clone()
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

    onNewTarget(event: EventTouch) {
        const l = event.getLocation();

        let cp = this.camera.node.getPosition()
        let pp = new Vec3(0, this.rigidBody.node.getPosition().y, 0)//this.rigidBody.node.getPosition()
        let r = (cp.subtract(pp).length() - this.camera.near) / (this.camera.far - this.camera.near)

        this.target = this.camera.screenToWorld(new Vec3(l.x, l.y, r)).clone()
        this.locator.position = this.target;
    }

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
            director.getScene().emit("player_failed");
            this.enabled = false
        }
        if (this.stop) {
            if (this.vel.length() > 1.0) {
                this.damp(1.0)
            }
            // return
        }

        let fv = this.target.clone().subtract(this.node.position)
        if (fv.length() > 1) {
            let speed = (this.speed * 0.05 - this.vel.length()) * deltaTime * 100
            let speedVec = new Vec3(speed, speed, speed)
            this.rigidBody.applyForce(fv.subtract(this.vel.multiply3f(0.5, 0.5, 0.5)).normalize().multiply(speedVec))
        }
        if (this.vel.length() > 0.1) {
            director.getScene().emit("player_move", this.node.position)
        }
        this.lpos = this.rigidBody.node.position.clone()
    }

}


