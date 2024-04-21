import { Component, ViewChild, ElementRef } from '@angular/core';
import { TextboxComponent } from "./textbox/textbox.component";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    imports: [TextboxComponent]
})
export class ReportsComponent {
    userQuery: string= '';
    requestedData: string= '';

    @ViewChild('csvDownloadLink') csvDownloadLink!: ElementRef<HTMLAnchorElement>;

    constructor(private http: HttpClient) {}

    onSubmit() {
        // Send the user query to the Laravel backend
        this.http.post('http://127.0.0.1:8000/api/export', { query: this.userQuery }, { responseType: 'text' }).subscribe(
            (response: string) => {     // Handle response
                // Convert the response blob to a .csv file and trigger download
                // Store the CSV data returned from the backend
                this.requestedData = response;
    });
  }

  downloadCSV() {
    // Create a Blob object from the CSV data
    const blob = new Blob([this.requestedData], { type: 'text/csv' });

    // Create a temporary URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Set the download link href attribute to the temporary URL
    this.csvDownloadLink.nativeElement.href = url;

    // Set the download attribute to specify the file name
    this.csvDownloadLink.nativeElement.download = 'exported_data.csv';

    // Programmatically click the download link
    this.csvDownloadLink.nativeElement.click();

    // Revoke the temporary URL to release memory
    window.URL.revokeObjectURL(url);
  }
}
            
            /**
             *          --  The below code is outdated as of 04/21 --
             */
                //     const blob = new Blob([response], { type: 'text/csv' });
            //     const url = window.URL.createObjectURL(blob);
            //     const a = document.createElement('a'); // 'a' represent the HTMLAnchorElement
            //     a.href = url;
            //     a.download = 'exported_data.csv';
            //     document.body.appendChild(a);
            //     a.click();
            //     document.body.removeChild(a);
            //     window.URL.revokeObjectURL(url);
            // }
//         );
//     }   
// }
