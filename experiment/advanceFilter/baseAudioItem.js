export class BaseAudioItem {
    constructor(audioNode) {
        this.node = audioNode;
        this.prevItem = null;
        this.nextItem = null;
    }

    disable() {
        this.node.disconnect();
        this.prevItem.node.connect(this.nextItem.node);
        this.prevItem.nextItem = this.nextItem;
        this.nextItem.prevItem = this.prevItem;
        this.prevItem = null;
        this.nextItem = null;
    };

    enable() {
    };
}
