import {BaseAudioItem} from "./baseAudioItem";

export class FilterItem extends BaseAudioItem {
    /**
     * @param audioCtx {AudioContext}
     * @param name {biquadFilterNodeType}
     */
    constructor(audioCtx, name) {
        super(audioCtx.createBiquadFilter());
        this.node.type = name;
    }

    /**
     * @param nextItem {!BaseAudioItem}
     */
    enable(nextItem) {
        this.prevItem = nextItem.prevItem;
        this.nextItem = nextItem;

        this.prevItem.node.disconnect();
        this.prevItem.node.connect(this.node);
        this.node.connect(this.nextItem.node);

        this.prevItem.nextItem = this;
        this.nextItem.prevItem = this;
    }
}
