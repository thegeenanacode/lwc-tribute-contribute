public with sharing class MemberController {
    public MemberController() {

    }

     // Method to retrieve a single member by ID
     @AuraEnabled(cacheable=true)
     public static Contact getMemberById(Id memberId) {
         return [SELECT Id, FirstName, LastName, Email FROM Contact WHERE Id = :memberId];
     }
 
     // Method to save or update a member
     @AuraEnabled
     public static Contact saveMember(Contact member) {
         try {
             upsert member;
             return member;
         } catch (Exception e) {
             throw new AuraHandledException('Error saving member: ' + e.getMessage());
         }
     }

     @AuraEnabled(cacheable=true)
    public static List<Contact> getMembers() {
        // This example assumes using the standard Contact object to manage members
        // Modify the SOQL query to match your specific needs
        try {
            return [SELECT Id, FirstName, LastName, Email FROM Contact ORDER BY LastName, FirstName];
        } catch (Exception e) {
            // Always include error handling to manage exceptions gracefully
            throw new AuraHandledException('Error retrieving members: ' + e.getMessage());
        }
    }
}