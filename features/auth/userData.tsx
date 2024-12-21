export default class UserData {
    name: string = "";
    age: number = 0;
    selectedCancerTypes: Array<CancerType> = [];
    lastDiagnosisDate: Date | null = null;
    otherConditionTypes: Array<OtherConditionType> = [];
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

export enum OtherConditionType {
    diabetes = 'condition_type_diabetes',
    heart_disease = 'condition_type_heart_disease',
    hypertension = 'condition_type_hypertension',
    glaucoma = 'condition_type_glaucoma',
    other = 'condition_type_other',
}