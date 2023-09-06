import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  public userData!: FormGroup

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userData = this.fb.group({
      userName: '',
      email: '',
      password: '',
    })
  }

  submit() {

  }
}