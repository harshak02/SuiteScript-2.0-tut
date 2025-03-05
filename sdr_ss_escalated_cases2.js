/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
 */
define(['N/search'],
    /**
     * @param {search} search
     * 
     */
    function (search) {
        /**
         * Definition of the Scheduled script trigger point.
         * 
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        function execute(context) {
            var caseSearch = search.create({
                type : search.Type.SUPPORT_CASE,
                filters : [
                    search.createFilter({
                        name : 'status',
                        operator : search.Operator.ANYOF,
                        values : 3 
                    }),

                    search.createFilter({
                        name : 'title',
                        join : 'employee',
                        operator : search.Operator.HASKEYWORDS,
                        values : 'Support'
                    })
                ],
                columns : [
                    search.createColumn({
                        name : 'title',
                        join : 'employee'
                    }),
                    search.createColumn({
                        name : 'department',
                        join : 'employee'
                    }),
                    search.createColumn({name : 'status'}),
                    search.createColumn({name : 'title'}),
                    search.createColumn({name : 'startdate'}),
                    search.createColumn({name : 'assigned'}),
                ]
            });

            var searchResults = caseSearch.run().getRange({
                start: 0,
                end: 9
            });

            for(var i = 0; i<searchResults.length; i++){
                var subject = searchResults[i].getValue('title');
                var assignedTo = searchResults[i].getText('assigned');
                var department = searchResults[i].getValue({
                    name : 'department',
                    join : 'employee'
                });
                var jobTitle = searchResults[i].getValue({
                    name : 'title',
                    join : 'employee'
                });

                log.debug('Case Info', 'Subject: \n' + subject + ' Assigned To: \n' + assignedTo + ' Department: \n' + department + ' Job Title: \n' + jobTitle);
            }
        }

        return {
            execute: execute
        }
    });

