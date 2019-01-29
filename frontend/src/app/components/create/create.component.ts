import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  addIssue(title, responsible, description, severity) {
    this.issueService.addIssue(title, responsible, description, severity).subscribe(
      () => {
        this.router.navigate(['/list']);
      }
    );
  }

  ngOnInit() {
  }

}
