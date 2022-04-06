import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import Konva from 'konva';



@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = { headers: new HttpHeaders({}) };
  }
  temp: any;
  type: any;
  post(path: String, body: any, s: any) {
    return this.http.post(`${environment.url}${path}`, body, this.httpOptions).subscribe((request) => {
      if (request != null) {
        this.temp = Konva.Node.create(request, 'container');
        s.add(this.temp);
      }
    });
  }
  get(path: String, s: any) {
    this.http.get(`${environment.url}${path}`, this.httpOptions).subscribe((request) => {
      if (request != null) {
        this.temp = Konva.Node.create(request, 'container');
        s.destroyChildren();
        s.add(this.temp);
      }
    });

  }
}
