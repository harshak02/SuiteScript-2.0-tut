/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/record', 'N/email', 'N/ui/dialog'],
    /**
     * 
     * @param {record} record
     * @param {email} email 
     * @param {dialog} dialog 
     */

    function (record, email, dialog) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         */
        function pageInit(context) {
            var employee = context.currentRecord;
            var perfCount = employee.getLineCount({
                sublistId: 'recmachcustrecord_sdr_perf_subordinate'
            });

            var fRatedCnt = 0;
            var notes = 'The employee has ' + perfCount + ' performance reviews. \n';
            for (var i = 0; i < perfCount; i++) {
                var ratingCode = employee.getSublistValue({
                    sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId: 'custrecord_sdr_perf_rating_code',
                    line: i
                })

                if (ratingCode == 'F') {
                    fRatedCnt++;
                }
            }
            notes += 'There are ' + fRatedCnt + ' performance reviews with a rating of F.';
            alert(notes);
        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number (if applicable)
         * @param {number} scriptContext.columnNum - Line number (if applicable)
         */
        function fieldChanged(context) {
            // Your code here
        }

        /**
         * Function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if the record is valid
         */
        function saveRecord(context) {
            // Your code here
            return true;
        }

        function lineInit(context) {
            var employee = context.currentRecord;

            if (context.sublistId == 'recmachcustrecord_sdr_perf_subordinate') {

                var reviewType = employee.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId: 'custrecord_sdr_perf_review_type'
                })

                if (!reviewType) {
                    employee.setCurrentSublistValue({
                        sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                        fieldId: 'custrecord_sdr_perf_review_type',
                        value: 1
                    })
                }
                //we can use setCurrentSublistText also but value should be 'Salary Changed'
            }
        }

        function validateLine(context) {
            var employee = context.currentRecord;

            if (context.sublistId == 'recmachcustrecord_sdr_perf_subordinate') {

                var salaryInc = employee.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId: 'custrecord_sdr_perf_sal_incr_amt'
                })
                if(salaryInc>5000){
                    alert('Salary increase cannot exceed $5000');
                    return false;
                }
            }   
            return true;         
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            saveRecord: saveRecord,
            lineInit: lineInit,
            validateLine : validateLine
        };
    });