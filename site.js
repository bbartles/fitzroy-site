/* Fitzroy & Co. — page behavior: nav, link wiring, email signup, hero readout, Capital Ledger */
(function () {
  'use strict';

  var cfg = window.FITZROY_CONFIG || {};
  var M = window.LedgerMath;
  function $(id) { return document.getElementById(id); }
  function all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Link wiring from config.js ---------- */
  all('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    var url = cfg[key];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (key === 'bookingUrl') {
      var subj = encodeURIComponent('Decision session request');
      a.href = 'mailto:' + (cfg.contactEmail || '') + '?subject=' + subj;
    } else if (document.getElementById('join')) {
      a.href = '#join';
    }
  });
  all('[data-email]').forEach(function (el) {
    var addr = cfg.contactEmail || '';
    el.textContent = addr;
    if (el.tagName === 'A') el.href = 'mailto:' + addr;
  });

  /* ---------- Email signup ---------- */
  all('form[data-capture]').forEach(function (form) {
    var msg = form.querySelector('.capture-msg');
    var input = form.querySelector('input[type="email"]');
    if (cfg.emailFormAction) {
      form.action = cfg.emailFormAction;
      form.method = 'post';
      form.target = '_blank';
      input.name = cfg.emailFieldName || 'email';
      if (cfg.emailInterestField && form.getAttribute('data-interest')) {
        var tag = document.createElement('input');
        tag.type = 'hidden';
        tag.name = cfg.emailInterestField;
        tag.value = form.getAttribute('data-interest');
        form.appendChild(tag);
      }
    }
    form.addEventListener('submit', function (e) {
      if (!cfg.emailFormAction) {
        e.preventDefault();
        msg.textContent = 'Signup is not open yet. Email ' + (cfg.contactEmail || 'us') + ' to be added to the list.';
        return;
      }
      msg.textContent = 'Thanks. Confirm your signup in the tab that just opened.';
    });
  });

  /* ---------- Slider helpers ---------- */
  function setFill(el) {
    var min = parseFloat(el.min), max = parseFloat(el.max), v = parseFloat(el.value);
    el.style.setProperty('--p', ((v - min) / (max - min) * 100) + '%');
  }
  function num(id) { return parseFloat($(id).value); }

  /* ---------- Home-page readout ---------- */
  var heroSentence = $('hero-sentence');
  if (heroSentence && M) {
    var heroIds = ['hero-need', 'hero-equity', 'hero-exit'];
    var heroRender = function () {
      var need = num('hero-need'), eq = num('hero-equity'), ex = num('hero-exit');
      $('hv-need').textContent = M.money(need);
      $('hv-equity').textContent = eq + '%';
      $('hv-exit').textContent = M.money(ex);
      var per = M.dilutionPerDollar(need, eq, ex);
      heroSentence.innerHTML =
        'Raising ' + M.money(need) + ' for ' + eq + '% of your company costs <strong>' + M.money(need * per) +
        '</strong> at a ' + M.money(ex) + ' exit. That is <strong>$' + per.toFixed(2) + '</strong> of exit value for every $1 you raise.';
      heroIds.forEach(function (id) { setFill($(id)); });
    };
    heroIds.forEach(function (id) { $(id).addEventListener('input', heroRender); });
    heroRender();
  }

  /* ---------- The Capital Ledger ---------- */
  var ledger = $('ledger');
  if (!ledger || !M) return;

  var ids = ['need', 'equity', 'exit', 'raiseMonths', 'raiseHours', 'bsMonths', 'bsHours', 'rate', 'delay', 'control', 'signal', 'option'];
  var CONTROL_WORDS = ['Barely matters', 'Matters a little', 'Matters', 'Matters a lot', 'Essential'];
  var SIGNAL_WORDS = ['Little value', 'Some value', 'Useful', 'Very valuable', 'Critical'];
  var OPTION_WORDS = ['Not a priority', 'Minor', 'Worth something', 'Important', 'Essential'];
  var fmtVal = {
    need: M.money,
    equity: function (n) { return n + '%'; },
    exit: M.money,
    raiseMonths: function (n) { return n + ' mo'; },
    raiseHours: function (n) { return n + ' hrs'; },
    bsMonths: function (n) { return n + ' mo'; },
    bsHours: function (n) { return n + ' hrs'; },
    rate: function (n) { return '$' + n + '/hr'; },
    delay: function (n) { return M.money(n) + '/mo'; },
    control: function (n) { return CONTROL_WORDS[n - 1]; },
    signal: function (n) { return SIGNAL_WORDS[n - 1]; },
    option: function (n) { return OPTION_WORDS[n - 1]; }
  };

  var lastSummary = '';

  function read() {
    var s = {};
    ids.forEach(function (id) { s[id] = num(id); });
    return s;
  }

  function render() {
    var s = read();
    ids.forEach(function (id) {
      $('v-' + id).textContent = fmtVal[id](s[id]);
      setFill($(id));
    });

    var r = M.calc(s);

    $('p-out').textContent = '$' + r.outPer.toFixed(2);
    $('p-bs').textContent = '$' + r.bsPer.toFixed(2);
    $('p-out').classList.toggle('win', r.cheaper === 'outside');
    $('p-bs').classList.toggle('win', r.cheaper === 'bootstrap');

    $('o-dilution').textContent = M.money(r.dilution);
    $('o-time').textContent = M.money(r.raiseTime);
    $('o-delay').textContent = M.money(r.outDelay);
    $('o-total').textContent = M.money(r.outTotal);
    $('b-dilution').textContent = '$0';
    $('b-time').textContent = M.money(r.bsTime);
    $('b-delay').textContent = M.money(r.bsDelay);
    $('b-total').textContent = M.money(r.bsTotal);
    $('sub-dilution').textContent = s.equity + '% of a ' + M.money(s.exit) + ' exit. At half or double that exit: ' +
      M.money(r.dilutionLow) + ' to ' + M.money(r.dilutionHigh) + '.';

    var gapPer = s.need > 0 ? r.gapDollars / s.need : 0;
    var reading;
    if (r.cheaper === 'even') {
      reading = 'At these numbers the two paths cost about the same, so the decision turns on what the math does not price.';
    } else {
      var who = r.cheaper === 'outside' ? 'Raising outside capital' : 'Bootstrapping';
      reading = 'At these numbers, ' + who.toLowerCase() + ' is cheaper by ' + M.money(r.gapDollars) +
        ', or $' + gapPer.toFixed(2) + ' for every $1 you need, once dilution, your time, and delay are priced in the same currency.';
    }
    $('reading-text').textContent = reading;

    var lean = M.lean({ control: s.control, signal: s.signal, option: s.option });
    var judgment;
    if (lean === 'raise') judgment = 'Your answers on control, investor signal, and staying independent lean toward raising.';
    else if (lean === 'bootstrap') judgment = 'Your answers on control, investor signal, and staying independent lean toward staying independent.';
    else judgment = 'Your answers on control, investor signal, and staying independent do not point strongly either way.';
    if ((r.cheaper === 'outside' && lean === 'bootstrap') || (r.cheaper === 'bootstrap' && lean === 'raise')) {
      judgment += ' Your numbers and your priorities disagree. That disagreement is the decision worth working through.';
    } else if ((r.cheaper === 'outside' && lean === 'raise') || (r.cheaper === 'bootstrap' && lean === 'bootstrap')) {
      judgment += ' Your numbers and your priorities point the same way.';
    }
    $('reading-judgment').textContent = judgment;

    lastSummary =
      'My Capital Ledger\n\n' +
      'Capital needed: ' + M.money(s.need) + '\n\n' +
      'Outside capital\n' +
      '  Equity given up: ' + s.equity + '%\n' +
      '  Estimated exit value: ' + M.money(s.exit) + '\n' +
      '  Cost of dilution: ' + M.money(r.dilution) + '\n' +
      '  Months to close: ' + s.raiseMonths + ', founder hours per month: ' + s.raiseHours + '\n' +
      '  Cost of founder time: ' + M.money(r.raiseTime) + '\n' +
      '  Cost of delay: ' + M.money(r.outDelay) + '\n' +
      '  Total: ' + M.money(r.outTotal) + ' ($' + r.outPer.toFixed(2) + ' per $1 raised)\n\n' +
      'Bootstrap\n' +
      '  Months to generate the capital: ' + s.bsMonths + ', founder hours per month: ' + s.bsHours + '\n' +
      '  Cost of founder time: ' + M.money(r.bsTime) + '\n' +
      '  Cost of delay: ' + M.money(r.bsDelay) + '\n' +
      '  Total: ' + M.money(r.bsTotal) + ' ($' + r.bsPer.toFixed(2) + ' per $1)\n\n' +
      'Reading: ' + reading + '\n' + judgment + '\n\n' +
      'Illustrative figures from fitzroyadvisory.com. Not investment advice.';

    var enc = encodeURIComponent;
    $('cta-email').href = 'mailto:?subject=' + enc('My Capital Ledger') + '&body=' + enc(lastSummary);
    var session = $('cta-session');
    if (cfg.bookingUrl) {
      session.href = cfg.bookingUrl; session.target = '_blank'; session.rel = 'noopener';
    } else {
      session.href = 'mailto:' + (cfg.contactEmail || '') + '?subject=' + enc('Decision session request') +
        '&body=' + enc('Hello,\n\nI ran my numbers through the Capital Ledger and would like to talk through the result.\n\n' + lastSummary);
    }
  }

  ids.forEach(function (id) { $(id).addEventListener('input', render); });

  var copyBtn = $('copy-numbers');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var done = function (ok) {
        $('copy-msg').textContent = ok ? 'Copied. Paste it into your booking notes.' : 'Copy did not work in this browser. Use "Email me this analysis" instead.';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastSummary).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  }

  render();
})();
