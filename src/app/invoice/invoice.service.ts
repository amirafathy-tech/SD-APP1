import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../shared/ApiService.service';
import { Invoice } from './invoice.model';
    
@Injectable()
export class InvoiceService {

    recordsChanged = new Subject<Invoice[]>();
    startedEditing = new Subject<number>();
    constructor(private apiService: ApiService) { }
    private recordsApi!: Invoice[]
  
    getRecords() {
      this.apiService.get<Invoice[]>('invoices').subscribe(response => {
        console.log(response);
        this.recordsApi = response;
        this.recordsChanged.next(this.recordsApi);
      });
    }
  
    getRecord(index: number): Observable<Invoice> {
      return this.apiService.getID<Invoice>('Invoice', index);
    }
   
    addRecord(record: Invoice) {
      this.apiService.post<Invoice>('Invoice', record).subscribe((response: Invoice) => {
        console.log('modelspecDetail created:', response);
        this.getRecords();
        return response
      });
    }
  
    updateRecord(index: number, newRecord: Invoice) {
      this.apiService.put<Invoice>('Invoice', index, newRecord).subscribe(response => {
        console.log('modelspecDetail updated:',response);
        this.getRecords()
      });
    }
  
    deleteRecord(index: any) {
      this.apiService.delete<Invoice>('Invoice', index).subscribe(response => {
        console.log('model spec deleted:',response);
        this.getRecords()
      });
    }

  //   {
  //     id: 1000,
  //     code: 'f230fh0g3',
  //     serviceNumber: 'Service 1',
  //     description: 'Service Description',
  //     quantity: 24,
  //     uom: 'KM',
  //     formula:'formula 1',
  //     amountPerUnit: 6500,
  //     currency: 'EGP',
  //     total: 20000,
  //     profitMargin: 5,
  //     totalWithProfit: 18000,
  //     selected: false,
  //     subItems: [1,2]
  // },

    getMainItemsWithSubItemsData() {
        return [
            {
                id: 1000,
                code: 'f230fh0g3',
                serviceNumber: 'Service 1',
                description: 'Service Description',
                quantity: 24,
                uom: 'KM',
                formula:'formula 1',
                amountPerUnit: 6500,
                currency: 'EGP',
                total: 20000,
                profitMargin: 5,
                totalWithProfit: 18000,
                selected: false,
                subItems: [
                    {
                        id: 1000-0,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 65000,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-1,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-2,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-3,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    }
                ]
            },
            {
                id: 1001,
                code: 'f230fh0g3',
                serviceNumber: 'Service 1',
                description: 'Service Description',
                quantity: 24,
                uom: 'KM',
                formula:'formula 1',
                amountPerUnit: 6500,
                currency: 'EGP',
                total: 20000,
                profitMargin: 5,
                totalWithProfit: 18000,
                selected: false,
                subItems: [
                    {
                        id: 1000-0,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 65000,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-1,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-2,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    },
                    {
                        id: 1000-3,
                        mainCode: 'f230fh0g3',
                        serviceNumber: 'Service sub 1',
                        description: 'Service Description',
                        quantity: 24,
                        uom: 'KM',
                        formula:'formula 1',
                        amountPerUnit: 6500,
                        currency: 'EGP',
                        total: 20000,
                        selected: false
                    }
                ]
            },
           
           
        ];
    }

    getMainItemsWithSubItems() {
        return Promise.resolve(this.getMainItemsWithSubItemsData());
    }
};