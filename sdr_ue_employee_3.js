/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define([],
    function () {
        // Set Values & Set Text
        return {
            afterSubmit: function (context) {
                var employeeRecord = context.newRecord;
                var empCode = employeeRecord.getValue('custentity_sdr_employee_code');
                employeeRecord.setValue('custentity_sdr_employee_code', empCode + ' - Updated');
                log.debug({
                    title: 'Employee Code',
                    details: empCode
                });
            }
        }
    }
)