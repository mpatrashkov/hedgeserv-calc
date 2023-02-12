import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Expr } from '@hedgeserv-calc/calc-types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalcServiceService {
  constructor(private http: HttpClient) {}

  async calculateExpression(expr: Expr): Promise<number> {
    const response = await firstValueFrom(
      this.http.post<{
        result: number;
      }>('http://localhost:3000/calc', expr)
    );

    return response.result;
  }
}
