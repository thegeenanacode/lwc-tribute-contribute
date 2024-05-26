import { LightningElement, track } from 'lwc';

export default class MainAppComponent extends LightningElement {
    @track selectedPage = 'home'; // default page
    isAdmin = false; // dynamically set based on user role

    connectedCallback() {
        // Assume we have a service to check user role
        this.checkUserRole();
    }

    checkUserRole() {
        // Placeholder function to determine if the user is an admin
        // This would typically involve a call to the backend or checking a user's profile
        this.isAdmin = true; // set this based on actual user role check
    }

    handleMenuSelect(event) {
        this.selectedPage = event.detail;
         console.log('selected menu item clicked : ' + selectedPage);
        // Additional logic to render the appropriate component or page
    }
}
