public with sharing class EventController {
    
    // Method to fetch all events
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() {
        try {
            return [SELECT Id, Name, Event_Date__c, Target_Amount__c, Description__c FROM Event__c ORDER BY Event_Date__c DESC];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving events: ' + e.getMessage());
        }
    }

    // Method to fetch a single event by ID
    @AuraEnabled(cacheable=true)
    public static Event__c getEventById(Id eventId) {
        try {
            return [SELECT Id, Name, Event_Date__c, Target_Amount__c, Description__c FROM Event__c WHERE Id = :eventId];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving the event: ' + e.getMessage());
        }
    }

    // Method to create a new event
    @AuraEnabled
    public static Event__c createEvent(String name, Date eventDate, Decimal targetAmount, String description) {
        try {
            Event__c newEvent = new Event__c(
                Name = name,
                Event_Date__c = eventDate,
                Target_Amount__c = targetAmount,
                Description__c = description
            );
            insert newEvent;
            return newEvent;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating event: ' + e.getMessage());
        }
    }

    // Method to update an existing event
    @AuraEnabled
    public static Event__c updateEvent(Id eventId, String name, Date eventDate, Decimal targetAmount, String description) {
        try {
            Event__c existingEvent = [SELECT Id FROM Event__c WHERE Id = :eventId LIMIT 1];
            existingEvent.Name = name;
            existingEvent.Event_Date__c = eventDate;
            existingEvent.Target_Amount__c = targetAmount;
            existingEvent.Description__c = description;
            update existingEvent;
            return existingEvent;
        } catch (Exception e) {
    
            throw new AuraHandledException('Error updating event: ' + e.getMessage());
        }
    }

    // Optional: Method to delete an event
    @AuraEnabled
    public static void deleteEvent(Id eventId) {
        try {
            Event__c eventToDelete = new Event__c(Id = eventId);
            delete eventToDelete;
        } catch (Exception e) {
            throw new AuraHandledException('Error deleting event: ' + e.getMessage());
        }
    }
}
