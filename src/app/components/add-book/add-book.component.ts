import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value).subscribe(
      () => {
        console.log('Data added succesfully');
        this.ngZone.run(() => this.router.navigateByUrl('/list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}