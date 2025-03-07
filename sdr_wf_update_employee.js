/**
 * @NApiVersion 2.0
 * @NScriptType workflowactionscript
 */
define(['N/record', 'N/runtime'], function (record, runtime) {

    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     */
    function onAction(context) {
        var workflowTotal = runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_wf_workflow_tot'
        });
        var expRep = context.newRecord;
        var expenseCount = expRep.getLineCount({
            sublistId: 'expense'
        });
        var employeeId = expRep.getValue('entity');
        var notes = 'Employee ' + employeeId + ' has ' + expenseCount + ' expenses' + ' and the total is ' + workflowTotal;
        log.debug('Total Expenses', notes);

        var employee = record.load({
            type : record.Type.EMPLOYEE,
            id : employeeId
        });

        employee.setValue('comments', notes);
        employeeId = employee.save();

        if(!employeeId){
            return 'Employee record not updated';
        }

        return 'Employee record updated';
    }

    return {
        onAction: onAction
    };
});