import invoices from '../invoices.js';
import plays from '../plays.js';
import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlaintext(createStatementData(invoice, plays));
}

function renderPlaintext(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

console.log(statement(invoices[0], plays));
