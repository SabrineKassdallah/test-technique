import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { TermsService } from '../services/terms.service';
import { Router } from '@angular/router';
import { Term } from '../models/term.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgModalConfirm } from '../modal.component';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  terms: Term[] = [];
  private readonly notifier!: NotifierService;

  constructor(public termsService: TermsService,
              private router: Router, 
              private modalService: NgbModal,
              notifierService: NotifierService) {
                this.notifier = notifierService;
               }

  ngOnInit(): void {
    this.getTerms()
  }

  getTerms() {
    this.termsService.getAll().subscribe((data)=>{
      this.terms = data;
    })
  }

  AddTerm() {
    this.router.navigate(['terms/add']);
  }

  deleteTermConfirmation(term: Term) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.termsService.deleteTermById(term).subscribe((data : any) => {
          this.notifier.notify('success', 'Term deleted!');
          this.getTerms();
        },
        (error : any) => {});
      },
        (reason) => {});
  }
}