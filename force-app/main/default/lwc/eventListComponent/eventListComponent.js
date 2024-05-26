import { LightningElement, wire, track } from 'lwc';
import getEvents from '@salesforce/apex/EventController.getEvents'; // Apex method to get events


export default class EventListComponent extends LightningElement {
    @track events = [];
    @track error;

    @wire(getEvents)
    wiredEvents({ error, data }) {
        if (data) {
            this.events = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.events = [];
        }
    }

    handleSelectEvent(event) {
        // Dispatch event with selected event details
        const eventDetail = event.target.dataset.eventId;
        console.log('eventDetail ===== ' + eventDetail);
        const selectEvent = new CustomEvent('selectevent', { detail: eventDetail });

        console.log('selectEvent ===== ' + selectEvent); 
        this.dispatchEvent(selectEvent);
    }
}
