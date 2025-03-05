/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 */
define(['N/search'], function(search) {

    function getInputData() {
        var invSearch = search.create({
            type : search.Type.TRANSACTION,
            filters : [
                //inline filter rather than creating a filter object
                ['type', search.Operator.ANYOF, 'CustInvc'],
                'AND',
                //avoid the all occurences of the Particular Transaction
                ['mainline', search.Operator.IS, true],
            ],
            columns : ['entity','total']
        });

        //just return the search object
        return invSearch;
    }

    function map(context) {
        // get only one part as param and work on it and returns 
        // gets in json format
        var searchResult = JSON.parse(context.value);
        // we get param as {entity: 1, total: 2}
        var customer = searchResult.values.entity.text;
        var total = searchResult.values.total;

        //add into the map 
        context.write({
            key : customer,
            value : total
        })
    }

    function reduce(context) {
        // here we get like key => array of values (not here case) 
        var total = 0;

        for(var i in context.values){
            total += parseFloat(context.values[i]);
        }

        log.debug('Customer', context.key + ' has total invoice of ' + total);
    }

    function summarize(summary) {
        log.audit('Summary', 'Map Reduce has been completed');
        log.audit('Number of queues', summary.conurrency);

        log.error('Input error', summary.inputSummary.error);

        summary.mapSummary.errors.iterator().each(function(key, value){
            log.error('Map Error for key', key + ' Error: ' + value);
            //return true to continue the iteration
            return true;
        });

        summary.reduceSummary.errors.iterator().each(function(key, value){
            log.error('Reduce Error for key', key + ' Error: ' + value);
            //return true to continue the iteration
            return true;
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});