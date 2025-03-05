/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/email', 'N/ui/dialog'],
    /**
     * 
     * @param {email} email 
     * @param {dialog} dialog 
     */

    function (email, dialog) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         */
        function pageInit(context) {
            var order = context.currentRecord;
            var status = order.getText('orderstatus');

            if (context.mode == 'edit' && status == 'Billed') {
                dialog.alert({
                    title: 'Edit Warning',
                    message: 'You cannot edit a billed order.'
                });

                email.send({
                    author : -5,
                    recipients : -5,
                    subject : 'Billed Order Edit Attempt',
                    body : 'User attempted to edit a billed order. Order id: ' + order.id + ' Transaction: ' + order.getValue('tranid')
                })
            }
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

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            saveRecord: saveRecord
        };
    });