import { InputSignal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

type extractGeneric<T> = T extends InputSignal<infer X> ? X : never;

export const setComponentInput = <T extends ComponentFixture<unknown>, K extends Extract<keyof T['componentInstance'], string>>(
  fixture: T,
  input: K,
  value: extractGeneric<T['componentInstance'][K]>
): void => {
  fixture.componentRef.setInput(input, value);
};
