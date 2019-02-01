import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from './model/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  private _uri = 'http://localhost:4000';

  getIssues() {
    return this.http.get(`${this._uri}/issues`);
  }

  getIssueById(id: string) {
    return this.http.get(`${this._uri}/issues/${id}`);
  }

  addIssue(title: string, responsible: string, description: string, severity: string) {
    const issue = {
      title, responsible, description, severity
    };
    return this.http.post(`${this._uri}/issues/add`, issue);
  }

  updateIssue(id: string, title: string, responsible: string,
    description: string, severity: string, status: string) {
    const issue = {
      title, responsible, description, severity, status
    };
    return this.http.put(`${this._uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id: string) {
    return this.http.delete(`${this._uri}/issues/delete/${id}`);
  }

}
