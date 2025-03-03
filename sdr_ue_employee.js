/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define([],
    function () {
        // Hello World User Event Script
        return {
            afterSubmit: function (context) {
                log.debug("Hello World");
            }
        }
    }
)