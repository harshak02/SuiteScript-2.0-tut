define(['N/record'], function (record) {

    var employeeRecord = record.load({
        type: record.Type.EMPLOYEE,
        id: 1,
        isDynamic: true
    });

    var newEmployee = record.create({
        type: record.Type.EMPLOYEE,
        isDynamic: true
    });

    var invoice = record.transform({
        fromId: 1,
        fromType: record.Type.SALES_ORDER,
        toType: record.Type.INVOICE,
    });
    
    return {
        
    }
})