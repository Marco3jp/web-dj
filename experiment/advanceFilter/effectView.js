import {FilterItem} from "./filterItem"

export class EffectView {
    /**
     *
     * @param audioContext
     * @param effectName
     * @param audioDestinationItem {AudioDestinationItem}
     */
    constructor(audioContext, effectName, audioDestinationItem) {
        this.effectItem = new FilterItem(audioContext, effectName);
        this.threholdElement = document.querySelector(`#${effectName}-threshold`);
        this.disableElement = document.querySelector(`#disable-${effectName}`);
        this.enableElement = document.querySelector(`#enable-${effectName}`);

        this.disableElement.addEventListener("click", () => {
            this.disableElement.disabled = true;
            this.enableElement.disabled = false;
            this.effectItem.disable();
        });

        this.enableElement.addEventListener("click", () => {
            this.disableElement.disabled = false;
            this.enableElement.disabled = true;
            this.effectItem.enable(audioDestinationItem);
        });

        this.threholdElement.addEventListener("change", () => {
            this.effectItem.node.frequency.setValueAtTime(this.threholdElement.valueAsNumber, audioContext.currentTime);
        });
    }
}
