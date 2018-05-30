import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/interval';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVairables } from './GlobalVairables';
import { CustomURLSearchParams } from './CustomURLSearchParams';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ApiService {
  apihost = environment.apihost;
  apibase = '/api';

  constructor(private http: Http,
              private router: Router,
              @Inject(DOCUMENT) private document: any) {
  }

  GetirIlTum(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirIlTum', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirIlceIlIDDen(ilid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('ilid', ilid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirIlceIlIDDen', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirKurumIlceIDDen(ilceid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('ilceid', ilceid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirKurumIlceIDDen', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirMahalleKurumIDDen(kurumid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('kurumid', kurumid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirMahalleKurumIDDen', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirAnaTasinmaz(mahalleId, adaNo, parselNo, bbno, bbno_all, logData?) {
    const body = new CustomURLSearchParams();
    body.set('mahalleId', mahalleId);
    body.set('adaNo', adaNo);
    body.set('parselNo', parselNo);
    if (bbno) {
      body.set('bbno', bbno);
    }
    body.set('bbno_all', bbno_all);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAnaTasinmaz', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirAnaTasinmazByParselID(parselid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('parselid', parselid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAnaTasinmaz', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirAnaTasinmazByMalik(tckn, ad, soyad, babaad, anaad, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tckn', tckn);
    body.set('ad', ad);
    body.set('soyad', soyad);
    body.set('babaad', babaad);
    body.set('anaad', anaad);
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAnaTasinmazByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirAnaTasinmazByMalikOverloadMalik(overload, malikler, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('malikler', JSON.stringify(malikler));
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAnaTasinmazByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }


  GetirRehinByMalikOverload(overload, malikler, mahalleler, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('malikler', JSON.stringify(malikler));
    body.set('mahalleler', JSON.stringify(mahalleler));
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirRehinByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirRehinByRehinOverload(overload, rehinler, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('rehinler', JSON.stringify(rehinler));
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirRehinByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirSerhBeyanLehtarBySBIOverload(overload, sbiler, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('sbiler', JSON.stringify(sbiler));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirSerhBeyanLehtarByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirSerhBeyanLehtarByMalikOverload(overload, malikler, mahalleler, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('malikler', JSON.stringify(malikler));
    body.set('mahalleler', JSON.stringify(mahalleler));
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirSerhBeyanLehtarByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }


  GetirAnaTasinmazByMalikOverloadHisse(overload, hisseler, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('hisseler', JSON.stringify(hisseler));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAnaTasinmazByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  Getir6183AnaTasinmazByMalikOverloadMalik(overload, malikler, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('overload', overload);
    body.set('malikler', JSON.stringify(malikler));
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/Getir6183AnaTasinmazByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  Getir6183AnaTasinmazByMalik(tckn, ad, soyad, babaad, anaad, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tckn', tckn);
    body.set('ad', ad);
    body.set('soyad', soyad);
    body.set('babaad', babaad);
    body.set('anaad', anaad);
    body.set('type', type);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/Getir6183AnaTasinmazByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }


  GetirSerhBeyanLehtarByMalik(tckn, ad, soyad, babaad, anaad, il_id, ilce_id, kurum_id, mahalle_id, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tckn', tckn);
    body.set('ad', ad);
    body.set('soyad', soyad);
    body.set('babaad', babaad);
    body.set('anaad', anaad);
    body.set('type', type);

    body.set('il_id', il_id);
    body.set('ilce_id', ilce_id);
    body.set('kurum_id', kurum_id);
    body.set('mahalle_id', mahalle_id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }


    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirSerhBeyanLehtarByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirRehinByMalik(tckn, ad, soyad, babaad, anaad, il_id, ilce_id, kurum_id, mahalle_id, type, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tckn', tckn);
    body.set('ad', ad);
    body.set('soyad', soyad);
    body.set('babaad', babaad);
    body.set('anaad', anaad);
    body.set('type', type);

    body.set('il_id', il_id);
    body.set('ilce_id', ilce_id);
    body.set('kurum_id', kurum_id);
    body.set('mahalle_id', mahalle_id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }


    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirRehinByMalik', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirTasinmazFromMalikAndHisse(malik_tip, malik_id, hisse_id, logData?) {
    const body = new CustomURLSearchParams();
    body.set('malik_tip', malik_tip);
    body.set('malik_id', malik_id);
    body.set('hisse_id', hisse_id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirTasinmazFromMalikAndHisse', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirSerhBeyanUstSerhBeyanli(type, referance, logData?) {
    const body = new CustomURLSearchParams();
    body.set('type', type);
    body.set('referance', referance);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirSerhBeyanUstSerhBeyanli', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirTeferruat(tasinmazid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tasinmazid', tasinmazid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirTeferruat', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirMuhdesat(tasinmazid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tasinmazid', tasinmazid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirMuhdesat', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirEklenti(tasinmazid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tasinmazid', tasinmazid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirEklenti', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirHisseTasinmazIDDen(tasinmazid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tasinmazid', tasinmazid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirHisseTasinmazIDDen', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }


  GetirTasinmazCbsData(tasinmazid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('tasinmazid', tasinmazid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + '/cbs/api' + '/GetirTasinmazCbsData', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirAktifKullaniciDetay(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirAktifKullaniciDetay', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirRehinHisseIDDen(hisseid, logData?) {
    const body = new CustomURLSearchParams();
    body.set('hisseid', hisseid);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirRehinHisseIDDen', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetRuleList(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetRuleList', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetFunctionsList(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetFunctionsList', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  AddNewRule(rule_data, logData?) {
    const body = new CustomURLSearchParams();
    body.set('rule_data', JSON.stringify(rule_data));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/AddNewRule', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  UpdateRule(rule_data, logData?) {
    const body = new CustomURLSearchParams();
    body.set('rule_data', JSON.stringify(rule_data));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/UpdateRule', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  DeleteRule(id, logData?) {
    const body = new CustomURLSearchParams();
    body.set('id', id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/DeleteRule', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetUserList(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetUserList', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  AddNewUser(user_data, logData?) {
    const body = new CustomURLSearchParams();
    body.set('user_data', JSON.stringify(user_data));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/AddNewUser', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  UpdateUser(user_data, logData?) {
    const body = new CustomURLSearchParams();
    body.set('user_data', JSON.stringify(user_data));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/UpdateUser', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  DeleteUser(id, logData?) {
    const body = new CustomURLSearchParams();
    body.set('id', id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/DeleteUser', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  UpdateProfile(user_data, logData?) {
    const body = new CustomURLSearchParams();
    body.set('user_data', JSON.stringify(user_data));
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/UpdateProfile', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetAppSetting(key, logData?) {
    const body = new CustomURLSearchParams();
    body.set('key', key);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetAppSetting', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  SetAppSetting(key, value, logData?) {
    const body = new CustomURLSearchParams();
    body.set('key', key);
    body.set('value', value);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/SetAppSetting', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetServiceStatus(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetServiceStatus', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetAPIList(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetAPIList', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  setAPIDuration(id, duration, logData?) {
    const body = new CustomURLSearchParams();
    body.set('id', id);
    body.set('duration', duration);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/setAPIDuration', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  TestPooling(logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    return this.intercept(this.http.post(this.apihost + this.apibase + '/TestPooling', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));

    // return this.http.withDownloadProgressListener(progress => {
    //   console.log('Downloading ');
    // }).post(this.apihost + this.apibase + '/TestPooling', body.toString(), this.jwt(true))
    //   .map((response: Response) => response.json());
    // return this.intercept(
    //   this.http.post(this.apihost + this.apibase + '/TestPooling', body.toString(), this.jwt(true))
    //     .withDownloadProgressListener(progress => { console.log(`Downloading ${progress.percentage}%`); }))
    //   .map((response: Response) => response.json()));
  }


  AnnouncementList(last_fetch_date, filter_type, logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    if (last_fetch_date) {
      body.set('last_fetch_date', last_fetch_date);
    }
    body.set('filter_type', filter_type);
    return this.intercept(this.http.post(this.apihost + this.apibase + '/AnnouncementList', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  AddNewAnnouncement(content, logData?) {
    const body = new CustomURLSearchParams();
    body.set('content', content);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/AddNewAnnouncement', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  DisableAnnouncement(id, logData?) {
    const body = new CustomURLSearchParams();
    body.set('id', id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/DisableAnnouncement', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  DeleteAnnouncement(id, logData?) {
    const body = new CustomURLSearchParams();
    body.set('id', id);
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/DeleteAnnouncement', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }

  GetirTapuBilgiTasinmazIcin(hisse_data, tasinmaz_data, logData?) {
    const body = new CustomURLSearchParams();
    if (logData) {
      body.set('logData', JSON.stringify(logData));
    }

    if (tasinmaz_data) {
      body.set('tasinmaz_data', JSON.stringify(tasinmaz_data));
    }

    if (hisse_data) {
      body.set('hisse_data', JSON.stringify(hisse_data));
    }
    return this.intercept(this.http.post(this.apihost + this.apibase + '/GetirTapuBilgiTasinmazIcin', body.toString(), this.jwt(true))
      .map((response: Response) => response.json()));
  }


  intercept(observable: Observable<any>) {
    return observable.catch(err => {
      if (!GlobalVairables.OnLogOut) {
        if (err.status >= 400 || err.status === 0) {
          if (err.status === 401 || err.status === 405) {
            let error_str;

            if (err.status === 401) {
              error_str = 'Oturum süreniz sona erdi. Lütfen aşağıdaki adımalrı izleyin.';
            }

            if (err.status === 405) {
              error_str = 'Hesabınıza başka başka bir cihazdan giriş yapıldı ve bu cihazdaki oturumunuz sonlandırıldı.' +
                ' Lütfen aşağıdaki adımalrı izleyin.';
            }

            GlobalVairables.OnLogOut = true;
            GlobalVairables.LastAuthError = error_str;
            this.router.navigate(['/expired']);
            return Observable.empty();
          } else {
            return this.unauthorised();
          }
        } else {
          return Observable.throw(err);
        }
      } else {
        return Observable.empty();
      }
    });
  }


  unauthorised(): Observable<any> {
    this.document.location.href = '../';

    // this.router.navigate(['/']);
    return Observable.empty();
  }


  private jwt(forpost) {
    // create authorization header with jwt token
    const currentUser = JSON.parse(sessionStorage.getItem('SESSIONID'));
    if (currentUser && currentUser.token) {

      const headers = new Headers({'Content-Type': (!forpost ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded')});
      const options = new RequestOptions({headers: headers});
      options.headers.set('x-access-token', currentUser.token);

      return new RequestOptions({headers: headers});
    }
  }
}
