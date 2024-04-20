import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {

  constructor() { }
  
  printReceipt(receiptData: any): void {
    const printWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (printWindow) {
      printWindow.document.write(this.getReceiptHtml(receiptData));
      printWindow.document.close(); // Necessary for some browsers
      printWindow.onload = () => {
        printWindow.focus(); // Necessary for some browsers
        printWindow.print();
        // Do not close the window after printing
      };
    } else {
      console.error('Failed to open print window.');
    }
  }
  private getReceiptHtml(data: any): string {
    return `
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .receipt-content { width: 300px; padding: 20px; text-align: left; }
          .header { font-size: 16px; margin-bottom: 20px; }
          .bold { font-weight: bold; }
          .date { margin-bottom: 10px; }
          .logo { margin-bottom: 20px; max-width: 60%; height: auto; }
        </style>
      </head>
      <body>
        <div class="receipt-content">
          <img class="logo" src="assets/HB_logo_white.jpg" alt="Company Logo">
          <br>
          <div class="header">1102 S. Union St.</div>
          <div>Suite 4</div>
          <div>337.4691466</div>
          <br><br>
          <div class="date">${new Date(data.date).toLocaleDateString()}</div>
          <div>Returns are for store credit only with receipt! Must be within 7 days of purchase and with original tags attached!</div>
          <br><br>
          <div>Discount: $${data.discount}</div>
          <div class="bold">Items Total: $${data.itemsTotal.toFixed(2)}</div>
          <div>Sales Tax: $${data.salesTax}</div>
          <div>Gift Card Balance Used: $${data.giftCard}</div>
          <div class="bold">Final Total: $${data.finalTotal.toFixed(2)}</div>
          <div>Sales Person: ${data.salePerson}</div>
          <br><br>
          <div>Thanks for shopping with us!</div>
          <br><br>
          <div>Customer Number: ${data.customerNumber}</div>
        </div>
      </body>
      </html>
    `;
  }
}


