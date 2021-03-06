import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Owner } from './../../_interfaces/owner.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public owners: Owner[] | undefined;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    let apiAddress: string = "api/owner";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.owners = res as Owner [];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getOwnerDetails = (id: any) => { 
    const detailsUrl: string = `/owner/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id: any) => { 
    const updateUrl: string = `/owner/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id: any) => { 
    const deleteUrl: string = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]); 
  }
}
