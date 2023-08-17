import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  loading: boolean = true; // Set to true initially or based on your logic

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getListOfLanguages();
  }
}
