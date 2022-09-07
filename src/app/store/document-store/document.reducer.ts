import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { window } from 'rxjs';
import { Document } from 'src/app/model/document';
import { MultipleDocs } from 'src/app/model/multiDocInterface';
import { addMultipleDocIds, removeMultipleDocIds, checkboxStatus } from './document.action';

export const initialDocIdsEntries: MultipleDocs[] = [];



export const docIdReducer = createReducer(
    initialDocIdsEntries,
    

  on(addMultipleDocIds, (entries, multidoc) => {
    //console.log(entries)
    let entriesClone: MultipleDocs[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push(multidoc);
    //console.log(entriesClone)
    entriesClone = [...new Set(entriesClone)]
    return entriesClone;
  }),


  on(removeMultipleDocIds, (entries, multidoc) => {
    //console.log(multidoc)
    const entriesClone: MultipleDocs[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(e => e.documentId === multidoc.documentId)
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found), 1)
    }
    
    return entriesClone;
  }),

)



export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      if (action.type === INIT || action.type == UPDATE) {
        const storageValue = localStorage.getItem("state");
        console.log((storageValue? true: false), "triggered")
        if (storageValue) {
          try {
            return JSON.parse(storageValue);
          } catch {
            localStorage.removeItem("state");
          }
        }
      }
      const nextState = reducer(state, action);
      localStorage.setItem("state", JSON.stringify(nextState));
      return nextState;
    };
  };
