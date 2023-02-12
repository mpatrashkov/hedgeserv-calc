export type Operation = '+' | '-' | '*' | '/';

export interface Expr {
  left: number;
  op: Operation;
  right?: number;
}
