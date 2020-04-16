import {BaseAudioItem} from "./baseAudioItem";

export class AudioBufferSourceItem extends BaseAudioItem {
    /**
     *
     * @param audioNode {AudioBufferSourceNode}
     */
    constructor(audioNode) {
        super(audioNode);
    }

    disable() {
        console.warn("this item is audio source item! DON'T ABLE TO DISABLE.");
    }

    enable() {
        console.warn("this item is audio source item! ALWAYS ENABLED.");
    }
}
