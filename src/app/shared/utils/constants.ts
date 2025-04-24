export class Constants {
  public static application: string = 'FactuFlAm';
  public static applicationName: string = 'Facturas Flecha Amarilla';
  public static applicationVersion: string = '1.0.0.0';
  public static tipoServicios: { id: number; name: string; description: string; }[] = [
    {id: 1, name: 'Flecha Amarilla', description: ''},
    {id: 2, name: 'Primera Plus', description: ''},
    {id: 3, name: 'Consumo de alimentos', description: ''},
  ]
}