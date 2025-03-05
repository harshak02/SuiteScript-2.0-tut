/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
     * @param {record} record 
     */
    function (record) {

        return {
            afterSubmit: function (context) {
                var employee = context.newRecord;

                if (context.type == context.UserEventType.CREATE) {
                    var phoneCall = record.create({
                        type: record.Type.PHONE_CALL,
                        //this one creates the record by using this form
                        //this overrides the default form of UI which we have set in the UI (SuiteBuilder)
                        defaultValues: {
                            customform: -150
                        }
                    })

                    phoneCall.setValue('title', 'Call to HR for Benefits');
                    //change the organizer field in UI to the employee id
                    phoneCall.setValue('assigned', employee.id);
                    phoneCall.save();

                    //creating EVENT Record when employee is created
                    var event = record.create({
                        type: record.Type.CALENDAR_EVENT,
                        isDynamic: true
                    });

                    //filling up mandatory fields
                    event.setValue('title', 'Welcome meet with supervisor');

                    //going to the sublist
                    //adding invite to the employee
                    event.selectNewLine({
                        sublistId : 'attendee'
                    })
                    event.setCurrentSublistValue({
                        sublistId : 'attendee',
                        fieldId : 'attendee',//here same name is there refer ss record browser
                        value : employee.id
                    })
                    event.commitLine({
                        sublistId : 'attendee'
                    })

                    //adding invite to the Supervisor
                    event.selectNewLine({
                        sublistId : 'attendee'
                    })
                    event.setCurrentSublistValue({
                        sublistId : 'attendee',
                        fieldId : 'attendee',//here same name is there refer ss record browser
                        value : employee.getValue('supervisor')
                    })
                    event.commitLine({
                        sublistId : 'attendee'
                    })

                    event.save();
                }
            }
        }
    }
)