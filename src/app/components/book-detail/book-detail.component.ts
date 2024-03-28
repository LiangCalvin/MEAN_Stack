import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
  ) {

    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    })

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetBook(this.getId).subscribe(res => {
      this.updateForm.patchValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      })
    })

  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(() => {
      console.log('Updated successfully')
      this.ngZone.run(() => this.router.navigateByUrl('/list'))
    }, (err) => {
      console.log(err);
    }
    )
  }

}
