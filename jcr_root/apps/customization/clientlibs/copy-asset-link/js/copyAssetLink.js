(function(window, document, Granite, $) {
    console.log('copyAssetLink.js loaded');
    $(window).adaptTo("foundation-registry").register("foundation.collection.action.action", {
        name: "cq.wcm.copyAssetLink",
        handler: function(name, el, config, collection, selections) {

            ids = selections.map(function(v) {
                return $(v).data("foundationCollectionItemId");
            });

            if (ids.length != 1) {
                return;
            }

            let link = window.location.origin + ids[0];
            copyToClipboard(link);

        }
    });

    function copyToClipboard(str) {

        const dummy = document.createElement('textarea');
        dummy.style.position = 'absolute';
        dummy.style.left = '-9999px';
        dummy.value = str;

        document.body.appendChild(dummy);
        dummy.select();
        try {
            document.execCommand('copy');
        } catch {
            let useragent = navigator.userAgent ? navigator.userAgent : 'unknown browser';
            log.warn('Copy to clipboard not supported by ' + useragent)
        } finally {
            document.body.removeChild(dummy);
        }
    }

})(window, document, Granite, Granite.$);