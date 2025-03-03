/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define(['N/search'],
    function (search) {
        return {
            afterSubmit: function (context) {
                var employee = context.newRecord;
                var empCode = employee.getValue('custentity_sdr_employee_code');
                var supervisorId = employee.getValue('supervisor');

                var supervisorName = '';
                if (supervisorId) {
                    var lookup = search.lookupFields({
                        type: search.Type.EMPLOYEE,
                        id: supervisorId,
                        columns: ['entityid']
                    });
                    supervisorName = lookup.entityid;
                }

                log.debug('Employee Code', empCode);
                log.debug('Supervisor Name', supervisorName);
                log.debug('Supervisor ID', supervisorId);
            }
        }
    }
);
