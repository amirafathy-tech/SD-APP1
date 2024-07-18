


import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';

import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { InvoiceService } from './invoice.service';
import { Invoice, SubItem } from './invoice.model';
import { ApiService } from '../shared/ApiService.service';


@Component({
  selector: 'app-invoice-test',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [MessageService, InvoiceService]
})
export class InvoiceComponent {

  recordType!: string; // Main or sub

  // for dropdowns:
  countries: any[] | undefined;
  selectedCountry: string | undefined;

  //

  public rowIndex = 0;

  invoices!: Invoice[];
 expandedRows: { [key: number]: boolean } = {}; 

 invoicesRecords!: Invoice[];
 subItemsRecords!: SubItem[];

 subItemsTestRecords!: SubItem[];

  constructor(private _ApiService: ApiService,private _InvoiceService: InvoiceService, private messageService: MessageService) { }

  ngOnInit() {

    this._ApiService.get<SubItem[]>('subitems').subscribe(response => {
      this.subItemsTestRecords = response;
      console.log(this.subItemsTestRecords);
    });

    // Assuming this is where you fetch and process your API response
this._ApiService.get<Invoice[]>('mainitems').subscribe(response => {
  this.invoicesRecords = response;
  
  // Initialize an object to hold lists of subitems by mainItemCode
  const organizedSubItems: { [mainItemCode: number]: number[] } = {};

  console.log(organizedSubItems);
  
  // Iterate through the invoicesRecords array
  this.invoicesRecords.forEach(item => {
    // Check if there's already an array for this mainItemCode, if not, create it
    if (!organizedSubItems[item.mainItemCode]) {
      organizedSubItems[item.mainItemCode] = [];
    }
    // Push all subItemCodes into the corresponding array
    item.subItemCode?.forEach(subItemCode => {
      organizedSubItems[item.mainItemCode].push(subItemCode);
    });
    console.log(organizedSubItems);
  });

  // Now organizedSubItems should have arrays of subItemCodes grouped by mainItemCode
  console.log(organizedSubItems);

  // Example of accessing subItemCodes for a specific mainItemCode, for instance mainItemCode = 1
  const subItemsForMainItemCode1 = organizedSubItems[1];
  console.log('SubItems for mainItemCode 1:', subItemsForMainItemCode1);
  
  // Now you can loop through each array of subItemCodes and do whatever you need
  Object.keys(organizedSubItems).forEach(mainItemCode => {
    const subItemCodes = organizedSubItems[parseInt(mainItemCode, 10)];
    console.log(subItemCodes);
    
    console.log(`SubItems for mainItemCode ${mainItemCode}:`, subItemCodes);
    // Here you can loop through subItemCodes and perform operations
    subItemCodes.forEach(subItemCode => {
      console.log(subItemCode);
      
      // Perform operations with subItemCode

      // let obj=this._ApiService.getID<SubItem>('subitems',subItemCode)
      // console.log(obj);
      

      this._ApiService.getID<SubItem>('subitems',subItemCode).subscribe(
        (subItem: SubItem) => {
          console.log(subItem);
          
          // Push the retrieved subItem into subItemsRecords array
          this.subItemsRecords.push(subItem);
        },
        error => {
          console.error('Error fetching subItem with code', subItemCode, error);
        }
      );
    });
    console.log(this.subItemsRecords);
    
  });
});


   // this._InvoiceService.getMainItemsWithSubItems().then((data) => (this.invoices = data));

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  expandAll() {
   // this.invoices.forEach(item => this.expandedRows[item.id] = true);
   this.invoices.forEach(item => this.expandedRows[item.mainItemCode] = true);
  }


  collapseAll() {
    this.expandedRows = {};
  }

  toggleSubItems(mainItem: any) {
    mainItem.showSubItems = !mainItem.showSubItems;
  }


  delete() {
    console.log("delete");

  }

  // to handel checkbox selection:
  selectedRecord: Invoice | null = null;
  selectedRecords: any[] = [];
 
  onRecordSelectionChange(event: any, mainItem: Invoice) {
    console.log(mainItem);
    console.log(event.checked);
    mainItem.selected = event.checked;
    console.log(mainItem.selected);

    if (mainItem.selected) {
      // User selected the record, now we need to select all associated orders
      if (mainItem.subItems && mainItem.subItems.length > 0) {
        console.log(mainItem.subItems);
        mainItem.subItems.forEach(subItem => subItem.selected = !subItem.selected);
        console.log(mainItem.subItems);
      }
    }
    else {
      // User deselected the record, so we need to deselect all associated orders
      if (mainItem.subItems && mainItem.subItems.length > 0) {
        mainItem.subItems.forEach(subItem => subItem.selected = false)
        console.log(mainItem.subItems);
      }
    }
  }


  onSubItemSelectionChange(event: any, subItem: any) {
    console.log(event);
    console.log(subItem);
  }


  addRow() {

    // const newProduct = {
    //   id: (this.invoices.length + 1),
    //   name: this.newProduct.name,
    //   orders: Array.from({ length: this.newProductOrders }
    //     //   , (_, i) => ({
    //     //     id: i + 1,
    //     //     customer: `Customer ${i + 1}`,
    //     //     date: '2023-06-09',
    //     //     amount: Math.floor(Math.random() * 1000),
    //     //     status: ['Pending', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 3)]
    //     // })
    //   )
    // };
    // console.log(newProduct.orders.length);


    // // Add the new product to the products array
    // this.invoices.push(newProduct);
    // console.log(this.invoices);

    // // Reset the dialog form
    // this.newProduct = { id: 0, name: '', orders: [] };
    // this.newProductOrders = 0;

  }


  // Export  to Excel Sheet
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const selectedRows = this.invoices;
      const worksheet = xlsx.utils.json_to_sheet(selectedRows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'invoice');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  // handle Formula Parameters 
  showPopup: boolean = false;
  parameterValues: { [key: string]: number } = {};
  showPopupUpdate: boolean = false;
  parameterValuesUpdate: { [key: string]: number } = {};
  openPopup() {
    if (this.selectedCountry) {
      this.showPopup = true;

    }
    else {
      this.showPopup = false;
    }
  }

  resultAfterTest!: number
  resultAfterTestUpdate!: number
  saveParameters() {
    if (this.selectedCountry) {
      console.log(this.parameterValues);
      const valuesOnly = Object.values(this.parameterValues)
        .filter(value => typeof value === 'number') as number[];
      console.log(valuesOnly);
      console.log(this.resultAfterTest);


      this.showPopup = false;
    }


  }

}


