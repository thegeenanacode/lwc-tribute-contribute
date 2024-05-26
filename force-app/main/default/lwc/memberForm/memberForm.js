import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class MemberForm extends LightningElement {
    @api recordId; // Member record ID passed from the parent component if in edit mode

    // Wired function to fetch member data for editing
    @wire(getRecord, { recordId: '$recordId', fields: ['Contact.FirstName', 'Contact.LastName', 'Contact.Email'] })
    member;

    get firstName() {
        return getFieldValue(this.member.data, 'Contact.FirstName');
    }

    // More getters for other fields...

    handleSuccess(event) {
        // Handle the success of form submission
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Success",
                message: "Member saved successfully",
                variant: "success"
            })
        );
        // Notify parent component that the member has been updated or created
        this.dispatchEvent(new CustomEvent('save'));
    }

    handleError(event) {
        // Handle errors during form submission
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Error",
                message: "Error saving member",
                variant: "error"
            })
        );
    }

    handleCancel() {
        // Notify parent component to cancel the form operation
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}
