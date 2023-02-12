import { Expr } from '@hedgeserv-calc/calc-types';

export function calculateExpression(expr: Expr) {
  if (!expr) {
    return 0;
  }

  if (expr.right === undefined || isNaN(expr.right)) {
    return expr.left;
  }

  if (expr.op === '*') {
    return expr.left * expr.right;
  }

  if (expr.op === '/') {
    return expr.left / expr.right;
  }

  if (expr.op === '-') {
    return expr.left - expr.right;
  }

  if (expr.op === '+') {
    return expr.left + expr.right;
  }
}
