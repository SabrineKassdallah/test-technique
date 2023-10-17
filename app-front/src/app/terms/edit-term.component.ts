import { Component, OnInit, ViewChild } from '@angular/core';
import { TermsService } from '../services/terms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Constants } from '../shared/constants';

export class TermForm {
  id: string="";
  name: string="";
  term_type: string="";
}
@Component({
  selector: 'edit-term',
  templateUrl: './edit-term.component.html',
  styleUrls: ['./edit-term.component.css'],
})
export class EditTermComponent implements OnInit {
  private readonly notifier!: NotifierService;
  editTermForm: TermForm = new TermForm();

  @ViewChild("termForm")
  termForm!: NgForm;

  isSubmitted: boolean = false;
  termId: any;
  termType!: string[];


  constructor(public termsService: TermsService,
              private router: Router, 
              private route: ActivatedRoute, 
              notifierService: NotifierService) {
                this.notifier = notifierService;
               }
  ngOnInit(): void {
    this.termType = Constants.termType;
    this.termId = this.route.snapshot.params['termId'];
    this.getTermById();
  }

  getTermById() {
    this.termsService.getTermById(this.termId).subscribe((data: any) => {
      if (data) {
        this.editTermForm.id = data.id;
        this.editTermForm.name = data.name;
        this.editTermForm.term_type = data.term_type;
      }
    },
      (error: any) => { });
  }
 
  EditTerm(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.termsService.editTerm(this.editTermForm).subscribe(async data => {
        this.notifier.notify('success', 'Term edited!');

        setTimeout(() => {
          this.router.navigate(['/terms']);
        }, 500);
      },
        async error => {
          this.notifier.notify('error', error.error);
        });
    }
  }
  
  back() {
    this.router.navigate(['terms']);
  }
}
