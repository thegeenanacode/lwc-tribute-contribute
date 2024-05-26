import { LightningElement, api } from 'lwc';

export default class AppMenu extends LightningElement {
    @api isAdmin = false;

    handleSelect(event) {
        console.log('Button was clicked!');

        const selected = event.currentTarget.dataset.value;

        console.log('Button was clicked! is === ' + selected);
         
        const selectEvent = new CustomEvent('menuselect', {
            detail: selected
        });
        this.dispatchEvent(selectEvent);
    }
}
