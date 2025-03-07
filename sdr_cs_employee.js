/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/record', 'N/log', 'N/runtime', 'N/https', 'N/url'], function (record, log, runtime, https, url) {

    function pageInit(context) {
        var employee = context.currentRecord;
        var empCode = employee.getValue('custentity_sdr_employee_code');

        if (!empCode) {
            var defaultCode = runtime.getCurrentScript().getParameter({
                name: 'custscript_sdr_default_emp_code'
            });

            employee.setValue('custentity_sdr_employee_code', defaultCode);
        }
    }

    function saveRecord(context) {
        var employee = context.currentRecord;
        var empCode = employee.getValue('custentity_sdr_employee_code');

        var restletUrl = url.resolveScript({
            scriptId: 'customscript_sdr_rl_validate_emp_code',
            deploymentId: 'customdeploy_sdr_rl_validate_emp_code',
            returnExternalUrl: false
        });

        var response = https.get({
            //internal url to the restlet
            url : restletUrl+'&sdr_emp_code=' + empCode
        });
        //hided the value of x 
        if (response.body == 'invalid') {
            alert("Please Enter the valid Employee Code");
            return false;
        }
        return true;
    }

    function validateField(context) {
        var employee = context.currentRecord;
        if (context.fieldId == 'custentity_sdr_employee_code') {
            var empCode = employee.getValue('custentity_sdr_employee_code');
            if (empCode == 'x') {
                alert("Please Enter the valid Employee Code");
                employee.setValue('custentity_sdr_employee_code', '');
                return false;
            }
        }
        return true;
    }

    function fieldChanged(context) {
        var employee = context.currentRecord;

        if (context.fieldId === 'phone') {
            var fax = employee.getValue('fax');

            if (!fax) {
                var phone = employee.getValue('phone');
                employee.setValue('fax', phone);
            }
        }
    }

    function postSourcing(context) {

    }

    function lineInit(context) {

    }

    function validateDelete(context) {
        return true;
    }

    function validateInsert(context) {
        return true;
    }

    function validateLine(context) {
        return true;
    }

    function sublistChanged(context) {

    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        // validateField: validateField,//comment out to implement the restlet tut
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // lineInit: lineInit,
        // validateDelete: validateDelete,
        // validateInsert: validateInsert,
        // validateLine: validateLine,
        // sublistChanged: sublistChanged
    };
});