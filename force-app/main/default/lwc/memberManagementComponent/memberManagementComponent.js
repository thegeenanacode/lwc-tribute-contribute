import { LightningElement, track } from 'lwc';

export default class MemberManagementComponent extends LightningElement {
    @track selectedMemberId = '';
    @track isEditMode = false;

    handleNewMember() {
        this.selectedMemberId = '';
        this.isEditMode = true;
    }

    handleMemberSelected(event) {
        this.selectedMemberId = event.detail;
        this.isEditMode = true;
    }

    handleSaveMember() {
        this.isEditMode = false;
    }

    handleCancel() {
        this.isEditMode = false;
    }
}
