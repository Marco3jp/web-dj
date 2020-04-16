import {BaseAudioItem} from "./baseAudioItem";

export class AudioDestinationItem extends BaseAudioItem {
    /**
     *
     * @param audioNode {AudioDestinationNode}
     */
    constructor(audioNode) {
        super(audioNode);
    }

    disable() {
        console.warn("this item is destination item! DON'T ABLE TO DISABLE.");
    }

    enable() {
        console.warn("this item is destination item! ALWAYS ENABLE.");
    }
}



