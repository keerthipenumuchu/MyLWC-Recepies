import { LightningElement, track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import {reduceErrors} from 'c/ldsUtils'
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class LdsCreateRecord extends LightningElement {
    @track accountId;

    name = '';

    handleNameChange(event){
        this.accountId = undefined;
        this.name = event.target.value;
    }
    createRecord(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = {apiName: ACCOUNT_OBJECT.objectApiName, fields};
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                
                this.dispatchEvent(
                    new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created successully: ' + account.id,
                    variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                    title: 'Error creating record',
                    message: error,
                    variant: 'error'
                    })
                );
            });
            
    }
}