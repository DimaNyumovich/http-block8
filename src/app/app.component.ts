import {Component, OnInit} from '@angular/core';
import {CarsService} from './cars.service';
import {Response} from '@angular/http'
import {Car} from './car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  cars: Car[] = [];
  carName: string = '';
  car: Car;
  colors = [
    'red', 'blue', 'green', 'yellow', 'pink', 'orange', 'grey'
  ]

  constructor(private carService: CarsService){}

  ngOnInit(){

  }

  loadCars() {
    this.carService
      .getCars()
      .subscribe((cars: Car[]) => this.cars = cars);
  }

  addCar() {
    this.carService
      .addCar(this.carName)
      .subscribe((car: Car) => this.cars.push(car));
    this.carName = '';
  }

  getRandColor() {
    const num = Math.round(Math.random() * (this.colors.length - 1));
    return this.colors[num]
  }

  setNewColor(car: Car) {
    this.carService
      .changeColor(car, this.getRandColor())
      .subscribe((data) => console.log(data))

  }

  deleteCar(car: Car) {
    this.carService
      .deleteCar(car)
      .subscribe((data) => {
        this.cars = this.cars.filter(c => c.id !== car.id)
      })
  }
}
