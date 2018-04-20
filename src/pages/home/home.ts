import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numerek: any;
  odliczanie: any;
  czas_losowania: any;
  school_name: any;
  when: any;
  logo_url: any;

  constructor(public navCtrl: NavController, public http: HttpClient) {

    this.numerek = "?"
    this.reload();

  }

  getDayName(nbr) {
    if (nbr == 0)
      return "Niedziela"
    if (nbr == 1)
      return "Poniedziałek"
    if (nbr == 2)
      return "Wtorek"
    if (nbr == 3)
      return "Środa"
    if (nbr == 4)
      return "Czwartek"
    if (nbr == 5)
      return "Piątek"
    if (nbr == 6)
      return "Sobota"
  }

  odliczanieHandler() {
    this.odliczanie = this.getOdliczanie();
  }

  getOdliczanie() {
    var teraz = new Date().getTime() / 1000;

    var do_losowania = Math.floor(this.czas_losowania - teraz);

    var godzin = Math.floor(do_losowania / 3600);
    do_losowania = do_losowania - godzin * 3600;
    var minut = Math.floor(do_losowania / 60);
    var sekund = do_losowania - minut * 60;

    return godzin + "h : " + minut + "m : " + sekund + "s";
  }

  reload() {
    this.http.get('http://szczeliwynumerek.appspot.com').subscribe(data => {
      this.numerek = data["numerek"];
      this.school_name = data["school_name"];
      this.logo_url = data["school_ico"];

      var when_date = new Date(data["data_losowania"]); // Środa : 20-12-2017
      this.when = this.getDayName(when_date.getDay()) + " : " + when_date.toLocaleDateString();

      this.czas_losowania = data["nastepne_losowanie"] / 1000;
      this.odliczanie = this.getOdliczanie();

      setInterval(() => { this.odliczanie = this.getOdliczanie(); }, 1000)

    }, err => {
      console.log(err);
    });
  }

  // format 03h : 12m : 34s

}
