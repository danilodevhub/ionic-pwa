import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  mqttMessages: Observable<MqttMessage>;
  sound: boolean;
  soundOnOff = 0;

  constructor(public navCtrl: NavController,
    private _mqttService: MqttService) {
    this.mqttMessages = this._mqttService.observe('danilodevhub/temperatura');
  }

  unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  powerSound() {
    this.soundOnOff = this.sound ? 1 : 0;
    this.unsafePublish('danilodevhub/acendeLuz', this.soundOnOff.toString())
  }
}
