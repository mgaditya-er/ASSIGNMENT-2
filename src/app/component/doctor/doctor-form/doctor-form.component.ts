import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent implements OnInit{
  doctorName: string = '';
  specialization: string = '';
  contactNumber: string = '';
  email: string = '';
  experienceYears: number = 0;
  dateOfJoining: string = '';  // Date of Joining

  specializationOptions = ['Cardiology', 'Dermatology', 'Neurology'];  // Dropdown options

  constructor() {}

  ngOnInit(): void {}
}
