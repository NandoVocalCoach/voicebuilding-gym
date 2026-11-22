// Language of the Gym pages: ?lang=es|en wins, then the site's saved choice (localStorage 'language'), else English.
// The choice is saved under the same key the rest of the site uses, and every link between these pages carries it.
(function () {
    function saved() { try { return localStorage.getItem('language'); } catch (_) { return null; } }
    function save(l) { try { localStorage.setItem('language', l); } catch (_) {} }
    function fromAddress() {
        var m = /[?&]lang=(en|es)\b/.exec(location.search);
        return m ? m[1] : null;
    }
    function apply(l) {
        var root = document.documentElement;
        root.setAttribute('data-lang', l);
        root.setAttribute('lang', l);
        var t = root.getAttribute('data-title-' + l);
        if (t) document.title = t;
        document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
            var base = a.getAttribute('href').split('?')[0];
            a.setAttribute('href', l === 'es' ? base + '?lang=es' : base);
        });
    }
    var lang = fromAddress() || saved();
    if (lang !== 'es') lang = 'en';
    apply(lang);
    document.addEventListener('DOMContentLoaded', function () {
        apply(lang);
        document.querySelectorAll('.gp-lang button').forEach(function (b) {
            b.addEventListener('click', function () { lang = b.getAttribute('data-set'); save(lang); apply(lang); });
        });
    });
})();
