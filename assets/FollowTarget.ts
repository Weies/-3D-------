import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowTarget')
export class FollowTarget extends Component {

    @property(Node)
    target: Node

    offset: Vec3

    start() {
        this.offset = this.node.position.subtract(this.target.position).clone()
    }

    update(deltaTime: number) {
        this.node.position = this.target.getPosition().add(this.offset)
    }
}

