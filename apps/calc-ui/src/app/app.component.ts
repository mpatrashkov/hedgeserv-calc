import { Component } from '@angular/core';

import { Operation, Expr } from '@hedgeserv-calc/calc-types';
import { CalcServiceService } from './calc-service/calc-service.service';

@Component({
  selector: 'hedgeserv-calc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentEntry = '';

  expr?: Expr;

  result = 0;

  constructor(private calcServiceService: CalcServiceService) {}

  onNumberClick(num: number) {
    this.clearExprIfComplete();

    this.currentEntry += num;
  }

  onDecimalClick() {
    if (!this.currentEntry) {
      this.onNumberClick(0);
    }

    if (this.currentEntry[this.currentEntry.length - 1] !== '.') {
      this.currentEntry += '.';
    }
  }

  onDelClick() {
    this.currentEntry = this.currentEntry.slice(0, -1);
  }

  onClearClick() {
    this.result = 0;
    this.currentEntry = '';
    this.expr = undefined;
  }

  onPercentClick() {
    this.useRealEntry();

    let percentValue = parseFloat(this.currentEntry) / 100;
    this.currentEntry = '';

    if (this.expr?.op === '+' || this.expr?.op === '-') {
      percentValue *= this.expr.left;
    }

    this.result = percentValue;
    this.clearExprIfComplete();
  }

  onChangeSignClick() {
    this.clearExprIfComplete();

    this.useRealEntry();
    this.currentEntry = (-parseFloat(this.currentEntry)).toString();
  }

  async onOperationClick(op: Operation) {
    if (!this.expr) {
      this.useRealEntry();
    }

    const currentNum = parseFloat(this.currentEntry);
    this.currentEntry = '';

    if (this.expr?.right) {
      this.expr = {
        left: this.result,
        op,
      };
    } else if (this.expr) {
      this.expr.right = currentNum;
    } else {
      this.expr = {
        left: currentNum,
        op,
      };
    }

    this.result = await this.calcServiceService.calculateExpression(this.expr);

    this.expr.right = undefined;
    this.expr.left = this.result;
  }

  async onResultClick() {
    if (!this.expr) {
      return;
    }

    this.useRealEntry();

    if (this.expr.right === undefined) {
      this.expr.right = parseFloat(this.currentEntry);
    } else {
      this.expr.left = this.result;
    }

    this.result = await this.calcServiceService.calculateExpression(this.expr);
    this.currentEntry = '';
  }

  clearExprIfComplete() {
    if (this.expr?.right) {
      this.expr = undefined;
    }
  }

  useRealEntry() {
    if (this.currentEntry === '') {
      this.currentEntry = this.result.toString();
    }
  }
}
