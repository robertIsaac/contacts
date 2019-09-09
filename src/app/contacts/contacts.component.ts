import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  letters$ = this.contactsService.contactByLetter$;

  constructor(
    protected contactsService: ContactsService,
  ) {
  }

  ngOnInit() {
  }

}
