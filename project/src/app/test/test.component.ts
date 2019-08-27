import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private fb: FormBuilder ) { }
  leagueForm: FormGroup;
  league_details: FormGroup;
  

  ngOnInit() {
    
    this.league_details = this.fb.group({
      name: "",
      founder: ""
    });

    this.leagueForm = this.fb.group({
      league_details: this.fb.group({
        name: "",
        founder: ""
      }),
      teams: this.fb.array([this.teams])
    });

    
  }
  
  get teams(): FormGroup {
    return this.fb.group({
      team_name: "",
      players: this.fb.array([this.players])
    });
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  addTeam() {
    (this.leagueForm.get("teams") as FormArray).push(this.teams);
  }

}
