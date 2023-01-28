import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public salesForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      csvFile: new FormControl(''),
      csvFileName: new FormControl(''),
      period: new FormControl(''),
      count: new FormControl(''),
    });
  }

  onFileChange(event: any) {
    console.log('Conversion progress...');
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.salesForm.patchValue({
        csvFile: reader.result,
        csvFileName: file.name,
      });
    };
  }

  async onSubmit() {
    console.log('On submit clicked');

    const result = await lastValueFrom(
      this.http.post<any>(
        'http://localhost:3000/productList',
        this.salesForm.value
      )
    );
    alert('Successfully uploaded');
  }
}
