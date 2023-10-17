import { Component, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef, Input, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReglesService } from '../services/regles.service';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TermsService } from '../services/terms.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModalConfirm } from '../modal.component';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'add-regle',
  templateUrl: './add-regle.component.html',
  styleUrls: ['./add-regle.component.css']

})
export class AddRegleComponent implements OnInit {
  terms: any[] = [];
  private readonly notifier!: NotifierService;
  regleForm!: NgForm;
  isSubmitted: boolean = false;
  data: any;
  ruleForm!: FormGroup;
  constructor(public reglesService: ReglesService,
              private router: Router,
              public termsService: TermsService,
              private modalService: NgbModal,
              notifierService: NotifierService, private fb: FormBuilder) {
                this.notifier = notifierService;
               }
  ngOnInit(): void {
    this.ruleForm = this.buildRuleForm();
    this.getTerms()
  }

  AddRegle(isValid: boolean){
    if (isValid) {
      this.reglesService.createRegle(this.ruleForm.value).subscribe(async data => {
        this.notifier.notify('success', 'regle created!');

        setTimeout(() => {
          this.router.navigate(['/regles']);
        }, 500);
      },
        async error => {
          this.notifier.notify('error', error.error);
        });
    }
  }

  buildRuleForm(): FormGroup {
    return this.fb.group({
      regle: this.fb.group({
        name: ['', Validators.required],
        hierarchy: this.fb.group({
          node_type: ['', Validators.required],
          childrens: this.fb.array([
          ])
        })
      })
    });
  }
  formStructureToJson(formGroup: FormGroup | FormArray | any): string {
    const formObject = formGroup.getRawValue(); // Use getRawValue to get data without form control state
    return JSON.stringify(formObject, null, 2); // Add formatting for readability
  }

  get regle(): FormGroup {
    return this.ruleForm.get('regle') as FormGroup;
  }
  
  get hierarchy(): FormGroup {
    return this.regle.get('hierarchy') as FormGroup;
  }


  get childrens(): FormArray {
    return this.hierarchy.get('childrens') as FormArray;
  }

  addChildHierarchy(parent: any) {
    const childrenArray = parent.get('childrens') as FormArray;
    childrenArray.push(
      this.fb.group({
          node_type: '',
          childrens: this.fb.array([])
        })
      );
  }

  addCriterHierarchy(parent: any) {
    const childrenArray = parent.get('childrens') as FormArray;
    childrenArray.push(
      this.fb.group({
        critere: this.fb.group({
          term_id: '',
          operator: '',
          value: '',
        })
      })
    );
  }
  

  removeChildHierarchy(parent: any, index: number) {
    const childrenArray = parent.get('childrens') as FormArray;
    childrenArray.removeAt(index);
  }

  removeHierarchyNode(childrenArray: any, index: number) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then(() => {
        childrenArray.removeAt(index);
      },
        () => {});


  }


  removeCriteria(child: any, index: number) {
    const criteriaArray = child.get('criteres') as FormArray;
    criteriaArray.removeAt(index);
  }

  back() {
    this.router.navigate(['regles']);
  }

  getTerms() {
    this.termsService.getAll().subscribe(terms => {
      this.terms = terms;
    });
  }
}

