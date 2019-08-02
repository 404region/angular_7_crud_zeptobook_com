export class MedicineModel {
    _id: string;
    name: String;
    nameLat: String;
    description: String; // тут по идеи должен быть массив объектов: {дескриптицион, источник}
    symptoms: String; // возможно тут тоже должен быть массив, для удобства поиска по базе по симптомам
}