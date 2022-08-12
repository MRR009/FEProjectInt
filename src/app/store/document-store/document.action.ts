import { createAction, props } from '@ngrx/store';
import { Document } from 'src/app/model/document';
import { MultipleDocs } from './document.reducer';

export const addMultipleDocIds = createAction("Add Id", props<Number>());
export const removeMultipleDocIds = createAction("Remove Id", props<Number>());
export const checkboxStatus = createAction("Toggle Checkbox", props<Boolean>());