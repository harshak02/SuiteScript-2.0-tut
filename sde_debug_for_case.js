//run the same in the suitescript debugger
require(['N/search'],
    /**
     * @param {search} search
     * 
     */
    function (search) {

        var caseSearch = search.load({
            id: 'customsearch_sde_escalated_searches'
        });

        var searchResults = caseSearch.run().getRange({
            start: 0,
            end: 9
        });

        var x = 0;
    }
);