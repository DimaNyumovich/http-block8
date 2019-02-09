import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {


  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3000/cars',{})
  }

  addCar(carName: string){
    const data = {
      name: carName,
      color: 'green'
    }
    return this.http.post('http://localhost:3000/cars', data)
  }

  changeColor(car: Car, color: string) {
    car.color = color;
    return this.http.put(`http://localhost:3000/cars/${car.id}`, car)
  }

  deleteCar(car: Car){
    return this.http.delete(`http://localhost:3000/cars/${car.id}`)
  }
}
