import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../interfaces/contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Letter } from '../interfaces/letter';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  get contacts$(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('/assets/contacts.json');
  }

  get sortedContact$(): Observable<Contact[]> {
    return this.contacts$.pipe(
      map(contacts => {
        return contacts.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
      })
    );
  }

  get contactByLetter$(): Observable<Letter[]> {
    return this.sortedContact$.pipe(
      map(contacts => ContactsService.getLetters(contacts))
    );
  }

  protected static getLetters(contacts: Contact[]): Letter[] {
    const letters: Letter[] = [];
    let lastLetter = '';
    for (const contact of contacts) {
      if (contact.name.charAt(0) !== lastLetter) {
        lastLetter = contact.name.charAt(0);
        letters.push({
          letter: lastLetter,
          contacts: []
        });
      }
      letters[letters.length - 1].contacts.push(contact);
    }
    return letters;
  }
}
