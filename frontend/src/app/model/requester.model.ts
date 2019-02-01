export class Requester {
  type: OrganisationType;
  name: string;
  contact: string[];


}

export enum OrganisationType {
  HERITAGE = 'erfgoed',
  ARTS = 'kunsten',
  GOVERNMENT = 'overheid',
  SERVICE_PROVIDER = 'leverancier',
  PERSON = 'particulier',
  OTHER = 'andere'
}
