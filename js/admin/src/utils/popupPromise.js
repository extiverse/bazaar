export default function(settings = {})
{
    const url = settings.url || '/';
    const waitForUrl = settings.waitForUrl || null;
    const width = settings.width || 600;
    const height = settings.height || 400;
    const $window = $(window);

    // The new Promise polyfill of Mithril v1 is a lot better
    const deferred = m.deferred();

    const popup = window.open(url, 'bazaarPopup',
        `width=${width},` +
        `height=${height},` +
        `top=${$window.height() / 2 - height / 2},` +
        `left=${$window.width() / 2 - width / 2},` +
        'status=no,scrollbars=no,resizable=no');

    const interval = window.setInterval(() => {
        try {
            if (popup.closed) {
                window.clearInterval(interval);
                deferred.reject();
            } else if (popup.document.URL === waitForUrl) {
                window.clearInterval(interval);
                popup.close();
                deferred.resolve();
            }
        } catch (e) {
            // Ignore errors, these will be cross-origin exceptions
        }
    }, 500);

    return deferred.promise;
}
