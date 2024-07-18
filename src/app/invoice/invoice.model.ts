
export class SubItem {
    subItemCode?: number;
    mainCode?: string;
    serviceNumberCode?: string;
    description?: string;
    quantity?: number;
    unitOfMeasurementCode?:string;
    formulaCode?:string;
    amountPerUnit?: number;
    currencyCode?: string;
    total?: number;
    selected?: boolean;

   
}

export class Invoice {
    mainItemCode: number=0;
    code?: string;
    serviceNumberCode?: string;
    description?: string;
    quantity?: number;
    unitOfMeasurementCode?:string;
    formulaCode?:string;
    amountPerUnit?: number;
    currencyCode?: string;
    total?: number;
    profitMargin?: number;
    totalWithProfit?: number;
    selected?: boolean;
    subItems?:SubItem[]
    subItemCode?: number[];
}