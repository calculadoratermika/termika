// psychrolib.js – Adaptado como módulo ES6 completo

export const SI = 0;
export const IP = 1;

const TMIN_SI = -100.0;
const TMAX_SI = 200.0;
const PMIN_SI = 0.00001;
const PMAX_SI = 2000000.0;

const TMIN_IP = -148.0;
const TMAX_IP = 392.0;
const PMIN_IP = 0.000072519;
const PMAX_IP = 295.3;

let unitSystem = SI;

export function SetUnitSystem(system) {
  unitSystem = system;
}

export function GetUnitSystem() {
  return unitSystem;
}

export function GetSatVapPres(Tdb) {
  if (unitSystem === SI) {
    if (Tdb < TMIN_SI || Tdb > TMAX_SI) throw new Error("Tdb fuera de rango.");
    return 610.78 * Math.exp((17.269 * Tdb) / (Tdb + 237.3)); // simplificada
  } else {
    if (Tdb < TMIN_IP || Tdb > TMAX_IP) throw new Error("Tdb fuera de rango.");
    return 0.0886 * Math.exp((17.67 * Tdb) / (Tdb + 243.5)); // simplificada
  }
}

export function GetVapPresFromRelHum(Tdb, RH) {
  return RH * GetSatVapPres(Tdb);
}

export function GetRelHumFromVapPres(Tdb, Pv) {
  return Pv / GetSatVapPres(Tdb);
}

export function GetTDewPointFromVapPres(Pv) {
  if (unitSystem === SI) {
    const a = 17.27;
    const b = 237.3;
    const alpha = Math.log(Pv / 610.78);
    return (b * alpha) / (a - alpha);
  } else {
    const a = 17.67;
    const b = 243.5;
    const alpha = Math.log(Pv / 0.0886);
    return (b * alpha) / (a - alpha);
  }
}

export function GetHumRatioFromVapPres(Pv, P) {
  return 0.62198 * Pv / (P - Pv);
}

export function GetTDewPointFromRelHum(Tdb, RH) {
  const Pv = GetVapPresFromRelHum(Tdb, RH);
  return GetTDewPointFromVapPres(Pv);
}