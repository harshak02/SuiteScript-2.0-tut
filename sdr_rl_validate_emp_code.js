/**
 * @NApiVersion 2.0
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'], function(record, search) {

    function doGet(params) {
        var empCode = params.sdr_emp_code;
        if(empCode == 'x'){
            return 'invalid';
        }
        // return { message: 'GET request received' };
        return 'valid';
    }

    function doPost(requestBody) {
        // Handle POST request
        return { message: 'POST request received' };
    }

    function doPut(requestBody) {
        // Handle PUT request
        return { message: 'PUT request received' };
    }

    function doDelete(requestParams) {
        // Handle DELETE request
        return { message: 'DELETE request received' };
    }

    return {
        get: doGet,
        post: doPost,
        put: doPut,
        delete: doDelete
    };
});