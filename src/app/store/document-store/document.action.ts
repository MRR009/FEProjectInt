import { createAction, props } from '@ngrx/store';
import { Document } from 'src/app/model/document';
import { MultipleDocs } from 'src/app/model/multiDocInterface';

export const addMultipleDocIds = createAction("Add Id", props<MultipleDocs>());
export const removeMultipleDocIds = createAction("Remove Id", props<MultipleDocs>());
export const checkboxStatus = createAction("Toggle Checkbox", props<Boolean>());