import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { Observable } from 'rxjs';
declare var bootstrap: any; // Declare bootstrap (needed for modal control in TS)

@Component({
  selector: 'app-doctor-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent implements OnInit, CanComponentDeactivate {
  doctorForm: FormGroup;
  specializationOptions = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics']; // Example options
  unsavedChanges: boolean = false;
  private modal: any;
  isModalHidden: boolean = true; // Tracks if the modal is hidden or visible

  constructor() {
    // Initialize the form group and form controls
    this.doctorForm = new FormGroup({
      doctorName: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{10}$') // 10 digits validation
      ]),
      experienceYears: new FormControl('', [Validators.required, Validators.min(0)]),
      specialization: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfJoining: new FormControl('', [Validators.required])
    });

    // Subscribe to form value changes to detect unsaved changes
    this.doctorForm.valueChanges.subscribe(() => {
      this.unsavedChanges = true;
    });
  }

  // Implement CanComponentDeactivate to check for unsaved changes
  canDeactivate(): boolean | Observable<boolean> {
    if (this.unsavedChanges) {
      this.isModalHidden = false;
      this.modal.show(); // Show the modal if there are unsaved changes
      return false; 
    }
    this.modal.hide()
    return true;

  }

  ngOnInit(): void {
    const modalElement = document.getElementById('confirmationModal');
    this.modal = new bootstrap.Modal(modalElement);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.doctorForm.valid) {
      console.log('Form Submitted', this.doctorForm.value);
      // Handle form submission (e.g., save data or call API)
      this.unsavedChanges = false; // Reset unsaved changes flag
    } else {
      console.log('Form is invalid');
    }
  }

  // Get form controls for easy access in the template
  get formControls() {
    return this.doctorForm.controls;
  }


  leavePage(): void {
    this.unsavedChanges = false; // Reset unsaved changes flag
    this.modal.hide(); // Hide the modal
    this.isModalHidden = true;
    // Trigger navigation (e.g., using router.navigate())
    // Perform your navigation logic here or leave the page
  }
}