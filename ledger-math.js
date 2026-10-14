/* The Capital Ledger — pure calculation logic (no DOM), shared by the page and the tests. */
(function (root) {
  'use strict';

  // s: { need, equity (%), exit, raiseMonths, raiseHours, bsMonths, bsHours, rate, delay }
  function calc(s) {
    var dilution = (s.equity / 100) * s.exit;
    var raiseTime = s.raiseMonths * s.raiseHours * s.rate;
    var bsTime = s.bsMonths * s.bsHours * s.rate;

    // Whichever path is slower pays the delay cost for the extra months.
    var gap = s.bsMonths - s.raiseMonths;
    var outDelay = gap < 0 ? -gap * s.delay : 0;
    var bsDelay = gap > 0 ? gap * s.delay : 0;

    var outTotal = dilution + raiseTime + outDelay;
    var bsTotal = bsTime + bsDelay;

    return {
      dilution: dilution,
      dilutionLow: dilution * 0.5,   // exit at half the base case
      dilutionHigh: dilution * 2,    // exit at double the base case
      raiseTime: raiseTime,
      bsTime: bsTime,
      outDelay: outDelay,
      bsDelay: bsDelay,
      outTotal: outTotal,
      bsTotal: bsTotal,
      outPer: s.need > 0 ? outTotal / s.need : 0,
      bsPer: s.need > 0 ? bsTotal / s.need : 0,
      cheaper: outTotal === bsTotal ? 'even' : (outTotal < bsTotal ? 'outside' : 'bootstrap'),
      gapDollars: Math.abs(outTotal - bsTotal)
    };
  }

  // Exit value given up per $1 of capital raised (dilution only, used by the home-page readout)
  function dilutionPerDollar(need, equityPct, exit) {
    if (!(need > 0)) return 0;
    return (equityPct / 100) * exit / need;
  }

  // q: { control, signal, option } each 1..5. Returns 'raise' | 'bootstrap' | 'balanced'.
  function lean(q) {
    var score = q.signal - (q.control + q.option) / 2; // -4 .. +4
    if (score >= 1) return 'raise';
    if (score <= -1) return 'bootstrap';
    return 'balanced';
  }

  function money(n) {
    var r = Math.round(n);
    return (r < 0 ? '-$' : '$') + Math.abs(r).toLocaleString('en-US');
  }

  root.calc = calc;
  root.dilutionPerDollar = dilutionPerDollar;
  root.lean = lean;
  root.money = money;
})(typeof module !== 'undefined' && module.exports ? module.exports : (window.LedgerMath = {}));
