import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit,CanComponentDeactivate{
  patientForm: FormGroup;
  genderOptions = ['Male', 'Female', 'Other'];  // Dropdown options

unsavedchanges : boolean = false;


  constructor() {
    // Initialize the form group and form controls
    this.patientForm = new FormGroup({
      name: new FormControl('',  Validators.required),
      dob: new FormControl('',  Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      gender: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),  // 10 digits validation
      address: new FormControl('', [Validators.required]),
      medicalHistory: new FormControl('', [Validators.required])
    });
    this.patientForm.valueChanges.subscribe(() => {
      this.unsavedchanges = true;
    });
  }
  canDeactivate():boolean{
    if(this.unsavedchanges)
    {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Form Submitted', this.patientForm.value);
      // Handle the form submission, save data or call API.
      this.unsavedchanges = false;
    } else {
      console.log('Form is invalid');
    }
  }

  // Get the form controls for easy access in the template
  get formControls() {
    return this.patientForm.controls;
  }
}
