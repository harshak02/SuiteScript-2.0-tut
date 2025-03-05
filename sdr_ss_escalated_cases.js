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
            var caseSearch = search.load({
                id : 'customsearch_sde_escalated_searches'
            });

            var searchResults = caseSearch.run().getRange({
                start: 0,
                end: 9
            });
        }

        return {
            execute: execute
        }
    });

