import { Component, OnInit, ViewChild } from '@angular/core';
import { TermsService } from '../services/terms.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Constants } from '../shared/constants';
export class NewTermForm {
  name: string="";
  term_type: string="";
}
@Component({
  selector: 'add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.css'],
})
export class AddTermComponent implements OnInit {
  private readonly notifier!: NotifierService;
  newTermForm: NewTermForm = new NewTermForm();

  @ViewChild("newTermForm")
  termForm!: NgForm;
  isSubmitted: boolean = false;
  termType!: string[];

  constructor(public termsService: TermsService,
              private router: Router, 
              notifierService: NotifierService) {
    this.notifier = notifierService; }
  
  ngOnInit(): void {
    this.termType = Constants.termType;
  }

  back() {
    this.router.navigate(['terms']);
  }

  createTerm(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.termsService.createTerm(this.newTermForm).subscribe(async data => {
        this.notifier.notify('success', 'Term created!');

        setTimeout(() => {
          this.router.navigate(['/terms']);
        }, 500);
      },
        async error => {
          this.notifier.notify('error', error.error);
      });
    }
  }

}



