import { Component, OnInit, Type } from '@angular/core';
import { Regle } from '../models/regle.model';
import { ReglesService } from '../services/regles.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModalConfirm } from '../modal.component';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'regle',
  templateUrl: './regle.component.html',
  styleUrls: ['./regle.component.scss']
})
export class RegleComponent implements OnInit {
  regles: Regle[] = [];
  private readonly notifier!: NotifierService;

  constructor(public reglesService: ReglesService,
    private modalService: NgbModal,
    notifierService: NotifierService,  private router: Router) {
      this.notifier = notifierService;
     }

  ngOnInit(): void {
    this.getRegles()
  }

  AddRegle() {
    this.router.navigate(['regles/add']);

  }
  getRegles() {
    this.reglesService.getAll().subscribe((data)=>{
      this.regles = data;
    })
  }
  deleteRegleConfirmation(regle: Regle){
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.reglesService.deleteRegleById(regle).subscribe((data : any) => {
          this.notifier.notify('success', 'Regle deleted!');
          this.getRegles();
        },
        (error : any) => {});
      },
        (reason) => {});
  }
}