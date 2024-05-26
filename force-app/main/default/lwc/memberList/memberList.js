import { LightningElement, api, wire } from 'lwc';
import getMembers from '@salesforce/apex/MemberController.getMembers';

export default class MemberList extends LightningElement {
    @api members;
    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Email', fieldName: 'email', type: 'email' },
        { type: 'action', typeAttributes: { rowActions: this.getRowActions } },
    ];

    @wire(getMembers)
    wiredMembers({ error, data }) {
        if (data) {
            this.members = data;
        } else {
            this.members = [];
        }
    }

    getRowActions(row, doneCallback) {
        const actions = [];
        actions.push({ label: 'Edit', name: 'edit' });
        actions.push({ label: 'Delete', name: 'delete' });
        donecallback(actions);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.dispatchEvent(new CustomEvent('memberselected', { detail: row.id }));
    }
}
