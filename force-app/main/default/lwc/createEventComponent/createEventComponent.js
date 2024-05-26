import { LightningElement, api, track } from 'lwc';

export default class CreateEventComponent extends LightningElement {
    @track event = {
        name: '',
        date: '',
        targetAmount: 0
    };

    handleChange(event) {
        const field = event.target.dataset.field;
        this.event[field] = event.target.value;
    }

    handleSave() {
        // Logic to save the event
    }
}
