import { Component } from '@angular/core';
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

    constructor(private http: HttpClient) {}

    

    onSubmit() {
        // Send the user query to the Laravel backend
        this.http.post('http://127.0.0.1:8000/api/export', { query: this.userQuery }, { responseType: 'blob' }).subscribe(
            (response) => {     // Handle response
                // Convert the response blob to a .csv file and trigger download
                const blob = new Blob([response], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a'); // 'a' represent the HTMLAnchorElement
                a.href = url;
                a.download = 'exported_data.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }
        );
    }   
}
