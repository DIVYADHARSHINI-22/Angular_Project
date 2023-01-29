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
  public prediction!: any | null;
  public showPrediction!: boolean;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      csvFile: new FormControl(''),
      csvFileName: new FormControl(''),
      period: new FormControl(''),
      count: new FormControl(''),
    });
    this.prediction = {
      accuracy: '',
      rmse: '',
      mae: '',
    };
    this.showPrediction = false;
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

    // const result = await lastValueFrom(
    //   this.http.post<any>(
    //     'http://localhost:3000/productList',
    //     this.salesForm.value
    //   )
    // );

    const [accuracy, rmse, mae] = await lastValueFrom(
      this.http.get<any>('http://127.0.0.1:5000/predict')
    );
    this.showPrediction = true;
    this.prediction = {
      accuracy,
      rmse,
      mae,
    };
  }
}
