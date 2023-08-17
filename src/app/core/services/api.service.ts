import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private baseService: BaseService) {}
  getListOfLanguages() {
    return this.baseService.get(`mypage/language/list`).then((res: any) => {
      console.log("res: ", res);
    });
  }
}
