import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  
  Books: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books = res;
    })
  }

  delete(id:any, i:any){
    console.log(id)
    if (window.confirm("Confirm delete?")){
      this.crudService.deleteBook(id).subscribe((res) =>{
        this.Books.splice(i,1);
      })
    }
  }

}
