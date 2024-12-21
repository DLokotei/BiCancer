export default class UserData {
    name: string = "";
    age: number = 0;
    selectedCancerTypes: Array<CancerType> = [];
}

export enum CancerType {
    breast = 'cancer_type_breast',
    lung = 'cancer_type_lung',
    colon = 'cancer_type_colon',
    endometrial = 'cancer_type_endometrial',
    cervial = 'cancer_type_cervial',
    ovarian = 'cancer_type_ovarian',
    other = 'cancer_type_other'
}