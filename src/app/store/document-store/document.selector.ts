import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { state } from '@angular/animations';
import { Document } from 'src/app/model/document';
import { MultipleDocs } from 'src/app/model/multiDocInterface';

export interface DocumentGroup {
    document: Document;
    isChecked: boolean;
  }



export const selectedDocIds = createSelector(
    createFeatureSelector('docIdEntries'),
    (state: MultipleDocs[]) => {
        console.log(state)
        return state
      }
)




export const selectGroupedDocIdEntries = createSelector(
    createFeatureSelector('docIdEntries'),
    (state: Document[]) => {
      var map: Map<number, DocumentGroup> = new Map;
  
      state.forEach(d => {
        if (map.get(d.id)) {
          (map.get(d.id) as DocumentGroup).isChecked = true;
        } else {
          map.set(d.id, { document: d, isChecked: false });
        }
      })
  
      const sortedMap = new Map([...map.entries()].sort());
      return Array.from(sortedMap.values());
    }
  )


