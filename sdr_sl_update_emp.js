/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record', 'N/log', 'N/redirect'],
    function (serverWidget, record, log, redirect) {

        function onRequest(context) {

            var request = context.request;
            var response = context.response;

            if (request.method === 'GET') {
                var name = request.parameters.sdr_name;
                var empId = request.parameters.sdr_empid;
                var notes = request.parameters.sdr_notes;

                var form = serverWidget.createForm({
                    title: 'Update Employee Notes',
                    hideNavBar: false
                });

                var nameFLD = form.addField({
                    id: 'custpage_sdr_emp_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Employee Name'
                });

                var notesFLD = form.addField({
                    id: 'custpage_sdr_notes',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Employee Notes'
                });

                var empIdFLD = form.addField({
                    id: 'custpage_sdr_emp_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Employee ID'
                });

                nameFLD.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                })

                empIdFLD.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                })

                form.addSubmitButton({
                    label: 'Continue'
                });

                nameFLD.defaultValue = name;
                empIdFLD.defaultValue = empId;
                notesFLD.defaultValue = notes;

                response.writePage(form);
            } else {
                //note we are fetching the data from the fields of the form
                var notes = request.parameters.custpage_sdr_notes;
                var empId = request.parameters.custpage_sdr_emp_id;
                var name = request.parameters.custpage_sdr_emp_name;

                var employee = record.load({
                    type: record.Type.EMPLOYEE,
                    id: empId
                });
                employee.setValue('comments', notes);
                employee.save();

                redirect.toRecord({
                    type: record.Type.EMPLOYEE,
                    id: employee.id
                });
            }

        }

        return {
            onRequest: onRequest
        };
    });