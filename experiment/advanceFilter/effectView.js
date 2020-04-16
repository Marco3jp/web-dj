import {FilterItem} from "./filterItem"

export class EffectView {
    constructor(audioContext, effectName, audioDestinationItem) {
        this.effectItem = new FilterItem(audioContext, effectName);
        this.threholdElement = document.querySelector(`#${effectName}-threshold`);
        this.disableElement = document.querySelector(`#disable-${effectName}`);
        this.enableElement = document.querySelector(`#enable-${effectName}`);

        this.disableElement.addEventListener("click", () => {
            if (window.lastEffectItem === this.effectItem) {
                window.lastEffectItem = this.effectItem.prevItem;
            }
            this.disableElement.disabled = true;
            this.enableElement.disabled = false;
            this.effectItem.disable();
        });

        this.enableElement.addEventListener("click", () => {
            this.disableElement.disabled = false;
            this.enableElement.disabled = true;
            this.effectItem.enable(window.lastEffectItem, audioDestinationItem);
            window.lastEffectItem = this.effectItem;
        });

        this.threholdElement.addEventListener("change", () => {
            this.effectItem.node.frequency.setValueAtTime(this.threholdElement.valueAsNumber, audioContext.currentTime);
        });
    }
}
